import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnswersModule } from './answers/answers.module';
import { QuestionsModule } from './questions/questions.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { LikesModule } from './likes/likes.module';
import { CrawlerModule } from './crawler/crawler.module';

@Module({
  imports: [
    AnswersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    QuestionsModule,
    UsersModule,
    AuthModule,
    LikesModule,
    CrawlerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
