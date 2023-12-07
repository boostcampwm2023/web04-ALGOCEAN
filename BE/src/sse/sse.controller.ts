import { Controller, Param, Req, Sse } from '@nestjs/common';
import { Request } from 'express';
import { SseService } from './sse.service';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Controller('sse')
export class SseController {
  constructor(
    private sseService: SseService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  @Sse(':userId')
  sse(@Param('userId') userId: number, @Req() req: Request): any {
    const userSubject = this.sseService.createSseStreamForUser(userId);

    req.on('close', () => this.sseService.removeSseStreamForUser(userId));

    return userSubject;
  }
}
