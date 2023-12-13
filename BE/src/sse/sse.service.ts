import { Injectable } from '@nestjs/common';
import { SendAnswerDto } from './dto/send-answer.dto';
import { PrismaService } from '../prisma.service';
import { Redis, InjectRedis } from '@nestjs-modules/ioredis';

@Injectable()
export class SseService {
  private readonly publishClient: Redis;
  constructor(
    private prisma: PrismaService,
    @InjectRedis() private readonly redisPublisher: Redis,
  ) {
    this.publishClient = this.redisPublisher.duplicate();
  }

  async sendNotificationToUser(alarmMessage: SendAnswerDto) {
    const encodedMessage = Buffer.from(
      JSON.stringify(alarmMessage),
      'utf-8',
    ).toString('base64');
    await this.publishClient.publish('HOHO', encodedMessage);
  }
}
