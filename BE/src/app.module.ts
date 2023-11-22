import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnswersModule } from './answers/answers.module';
import { QuestionsModule } from './questions/questions.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AnswersModule, QuestionsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
