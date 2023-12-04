import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma.service';
import { QuestionsService } from '../questions/questions.service';
import { AnswersService } from '../answers/answers.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, QuestionsService, AnswersService],
  exports: [UsersService],
})
export class UsersModule {}
