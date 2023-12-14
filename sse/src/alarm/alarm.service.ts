import { Injectable } from '@nestjs/common';
import { ReplaySubject } from 'rxjs';
import { SendAnswerDto } from './dto/send-answer.dto';
import { PrismaService } from '../prisma.service';
import { Redis, InjectRedis } from '@nestjs-modules/ioredis';

@Injectable()
export class AlarmService {
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

    this.startMonitoringHOHOChannel();
  }

  async startMonitoringHOHOChannel() {
    await this.subscribeClient.subscribe('HOHO');
    this.subscribeClient.on('message', (channel, message) => {
      if (channel === 'HOHO') {
        this.handleHOHOMessage(message);
      }
    });
  }

  handleHOHOMessage(message: string) {
    const encodedMessage = Buffer.from(message, 'base64').toString();
    const { userId, ...msg } = JSON.parse(encodedMessage);
    return this.sendNotificationToUser(userId, msg);
  }

  async sendNotificationToUser(userId: number, alarmMessage: SendAnswerDto) {
    const userKey = `user:${userId}`;
    const encodedMessage = Buffer.from(
      JSON.stringify(alarmMessage),
      'utf-8',
    ).toString('base64');
    await this.publishClient.publish(userKey, encodedMessage);
  }

  async createSseStreamForUser(userId: number): Promise<ReplaySubject<string>> {
    if (!this.userSubjects[userId]) {
      this.userSubjects[userId] = new ReplaySubject<string>(10);

      // Redis Pub/Sub을 통한 메시지 구독
      await this.subscribeClient.subscribe(`user:${userId}`);
      this.subscribeClient.on('message', async (channel, message) => {
        if (channel === `user:${userId}`) {
          this.userSubjects[userId].next(message);
          const decodedMessage = Buffer.from(message, 'base64').toString();
          const { questionId } = JSON.parse(decodedMessage);
          await this.prisma
            .$executeRaw`UPDATE Notification SET IsRead = true WHERE UserId = ${userId} AND QuestionId = ${questionId}`;
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
      const encodedMessage = Buffer.from(
        JSON.stringify(alarmMessage),
        'utf-8',
      ).toString('base64');
      this.userSubjects[userId].next(JSON.stringify(encodedMessage));
    });

    // await this.prisma.notification.updateMany({
    //   where: {
    //     UserId: userId,
    //     IsRead: false,
    //   },
    //   data: {
    //     IsRead: true,
    //   },
    // });

    return this.userSubjects[userId];
  }

  async createSseStreamForUser2(
    userId: number,
  ): Promise<ReplaySubject<string>> {
    if (!this.userSubjects[userId]) {
      this.userSubjects[userId] = new ReplaySubject<string>(10);

      // Redis Pub/Sub을 통한 메시지 구독
      await this.subscribeClient.subscribe(`user:${userId}`);
      this.subscribeClient.on('message', async (channel, message) => {
        if (channel === `user:${userId}`) {
          this.userSubjects[userId].next(message);
          const decodedMessage = Buffer.from(message, 'base64').toString();
          const { questionId } = JSON.parse(decodedMessage);
          await this.prisma
            .$executeRaw`UPDATE Notification SET IsRead = true WHERE UserId = ${userId} AND QuestionId = ${questionId}`;
        }
      });
    }

    // NestJS 서버 재시작 후에 Redis에서 데이터를 가져오기 위해 Prisma 사용
    const pendingNotifications: any[] = await this.prisma
      .$queryRaw`SELECT * FROM Notification WHERE UserId = ${userId} AND IsRead = false`;
    // pendingNotifications에 저장된 알림을 SendAnswerDto 형태로 변환하여 SSE 스트림에 전달

    pendingNotifications.forEach((notification) => {
      const alarmMessage: SendAnswerDto = {
        questionId: notification.QuestionId,
        questionTitle: notification.QuestionTitle,
        answerId: notification.AnswerId,
        answerCreatedDate: notification.AnswerCreatedAt,
      };
      const encodedMessage = Buffer.from(
        JSON.stringify(alarmMessage),
        'utf-8',
      ).toString('base64');
      this.userSubjects[userId].next(JSON.stringify(encodedMessage));
    });

    // await this.prisma.notification.updateMany({
    //   where: {
    //     UserId: userId,
    //     IsRead: false,
    //   },
    //   data: {
    //     IsRead: true,
    //   },
    // });

    return this.userSubjects[userId];
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

  async dummy() {
    // 1 ~ 10번 userId를 가진 사용자에게 더미데이터 전송
    for (let i = 1; i <= 500; i++) {
      const alarmMessage: SendAnswerDto = {
        questionId: 1,
        questionTitle: '더미데이터',
        answerId: 1,
        answerCreatedDate: new Date(),
      };
      await this.sendNotificationToUser(i, alarmMessage);
    }
  }
}
