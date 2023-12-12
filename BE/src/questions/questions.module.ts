import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService, PrismaService],
})
export class QuestionsModule {}
