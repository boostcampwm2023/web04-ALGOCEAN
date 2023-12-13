import { Controller, Param, Req, Sse } from '@nestjs/common';
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
}
