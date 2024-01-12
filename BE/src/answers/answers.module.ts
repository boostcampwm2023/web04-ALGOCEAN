import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { PrismaService } from '../prisma.service';
import { SseService } from '../sse/sse.service';
import { SseModule } from '../sse/sse.module';

@Module({
  controllers: [AnswersController],
  providers: [AnswersService, PrismaService, SseService],
  imports: [SseModule],
})
export class AnswersModule {}
