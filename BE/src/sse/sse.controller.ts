import { Controller, Param, Req, Sse } from '@nestjs/common';
import { Request } from 'express';
import { SseService } from './sse.service';

@Controller('sse')
export class SseController {
  constructor(private sseService: SseService) {}

  @Sse(':userId')
  sse(@Param('userId') userId: number, @Req() req: Request): any {
    const userSubject = this.sseService.createSseStreamForUser(userId);

    req.on('close', () => this.sseService.removeSseStreamForUser(userId));

    return userSubject;
  }
}
