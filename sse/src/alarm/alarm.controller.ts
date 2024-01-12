import { Controller, Get, Param, Req, Sse } from '@nestjs/common';
import { Request } from 'express';
import { AlarmService } from './alarm.service';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Controller('alarm')
export class AlarmController {
  constructor(
    private readonly alarmService: AlarmService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  @Sse(':userId')
  sse(@Param('userId') userId: number, @Req() req: Request): any {
    const userSubject = this.alarmService.createSseStreamForUser(userId);

    req.on('close', () => this.alarmService.removeSseStreamForUser(userId));
    return userSubject;
  }

  @Sse('test/:userId')
  sseTest(@Param('userId') userId: number, @Req() req: Request): any {
    const userSubject = this.alarmService.createSseStreamForUser2(userId);

    req.on('close', () => this.alarmService.removeSseStreamForUser(userId));
    return userSubject;
  }

  // 부하테스트용 더미데이터 요청
  @Get('dummy')
  async dummy() {
    return this.alarmService.dummy();
  }
}
