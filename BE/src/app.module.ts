import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnswersModule } from './answers/answers.module';
import { QuestionsModule } from './questions/questions.module';
import { UsersModule } from './users/users.module';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [AnswersModule, QuestionsModule, UsersModule, LikesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
