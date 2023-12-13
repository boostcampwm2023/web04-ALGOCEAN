import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SseService } from './sse.service';

@Module({
  controllers: [],
  providers: [PrismaService, SseService],
  exports: [SseService],
})
export class SseModule {}
