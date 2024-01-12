import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma.service';
import { QuestionsService } from '../questions/questions.service';
import { AnswersService } from '../answers/answers.service';
import { SseService } from '../sse/sse.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    QuestionsService,
    AnswersService,
    SseService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
