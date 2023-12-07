import { Module } from '@nestjs/common';
import { SseController } from './sse.controller';
import { PrismaService } from '../prisma.service';
import { SseService } from './sse.service';

@Module({
  controllers: [SseController],
  providers: [PrismaService, SseService],
  exports: [SseService],
})
export class SseModule {}
