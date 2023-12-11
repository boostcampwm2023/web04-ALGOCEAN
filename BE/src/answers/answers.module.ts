import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { PrismaService } from '../prisma.service';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [AnswersController],
  providers: [AnswersService, PrismaService, UsersService],
})
export class AnswersModule {}
