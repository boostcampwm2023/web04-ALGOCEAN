import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { PrismaService } from '../prisma.service';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService, PrismaService, UsersService],
})
export class QuestionsModule {}
