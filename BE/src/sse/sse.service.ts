import { Injectable } from '@nestjs/common';
import { ReplaySubject } from 'rxjs';
import { SendAnswerDto } from './dto/send-answer.dto';
import { PrismaService } from '../prisma.service';
import { Redis, InjectRedis } from '@nestjs-modules/ioredis';

@Injectable()
export class SseService {
  private readonly publishClient: Redis;
  private readonly subscribeClient: Redis;
  private readonly userSubjects: Record<number, ReplaySubject<string>>;

  constructor(
    private prisma: PrismaService,
    @InjectRedis() private readonly redisPublisher: Redis,
    @InjectRedis() private readonly redisSubscriber: Redis,
  ) {
    this.publishClient = this.redisPublisher.duplicate();
    this.subscribeClient = this.redisSubscriber.duplicate();
    this.userSubjects = {};
  }

  async sendNotificationToUser(userId: number, alarmMessage: SendAnswerDto) {
    const userKey = `user:${userId}`;

    // Redis를 사용하여 알림을 저장
    await this.publishClient.publish(userKey, JSON.stringify(alarmMessage));
  }

  async createSseStreamForUser(userId: number): Promise<ReplaySubject<string>> {
    if (!this.userSubjects[userId]) {
      this.userSubjects[userId] = new ReplaySubject<string>(10);

      // Redis Pub/Sub을 통한 메시지 구독
      await this.subscribeClient.subscribe(`user:${userId}`);
      this.subscribeClient.on('message', (channel, message) => {
        if (channel === `user:${userId}`) {
          this.handleRedisMessage(userId, JSON.parse(message));
        }
      });
    }

    // NestJS 서버 재시작 후에 Redis에서 데이터를 가져오기 위해 Prisma 사용
    const pendingNotifications = await this.prisma.notification.findMany({
      where: {
        UserId: userId,
        IsRead: false,
      },
    });

    // pendingNotifications에 저장된 알림을 SendAnswerDto 형태로 변환하여 SSE 스트림에 전달
    pendingNotifications.forEach((notification) => {
      const alarmMessage: SendAnswerDto = {
        questionId: notification.QuestionId,
        questionTitle: notification.QuestionTitle,
        answerId: notification.AnswerId,
        answerCreatedDate: notification.AnswerCreatedAt,
      };
      this.userSubjects[userId].next(JSON.stringify(alarmMessage));
    });

    await this.prisma.notification.updateMany({
      where: {
        UserId: userId,
        IsRead: false,
      },
      data: {
        IsRead: true,
      },
    });

    return this.userSubjects[userId];
  }

  // SSE 스트림을 구독할 때 메시지 처리
  async handleRedisMessage(userId: number, alarmMessage: SendAnswerDto) {
    // 여기서는 알림을 처리하고 DB에 저장할지 여부를 결정
    if (this.shouldStoreNotificationInDB(userId)) {
      await this.storeNotificationInDB(userId, alarmMessage);
    } else {
      // DB에 저장하지 않을 경우 SSE 스트림에 알림 추가
      this.userSubjects[userId].next(JSON.stringify(alarmMessage));
    }
  }

  private shouldStoreNotificationInDB(userId: number): boolean {
    return !this.userSubjects[userId];
  }
  async storeNotificationInDB(userId: number, alarmMessage: SendAnswerDto) {
    await this.prisma.notification.create({
      data: {
        UserId: userId,
        QuestionId: alarmMessage.questionId,
        QuestionTitle: alarmMessage.questionTitle,
        AnswerId: alarmMessage.answerId,
        AnswerCreatedAt: alarmMessage.answerCreatedDate,
        IsRead: false,
      },
    });
  }

  // Redis에서 사용자 키 삭제
  removeSseStreamForUser(userId: number) {
    this.subscribeClient.unsubscribe(`user:${userId}`);
    delete this.userSubjects[userId];
  }
}
