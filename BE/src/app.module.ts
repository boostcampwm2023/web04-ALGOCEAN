import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnswersModule } from './answers/answers.module';
import { QuestionsModule } from './questions/questions.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SseModule } from './sse/sse.module';
import { LikesModule } from './likes/likes.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { PollingModule } from './polling/polling.module';

@Module({
  imports: [
    AnswersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedisModule.forRootAsync({
      useFactory: () => ({
        config: {
          url: process.env.REDIS_URL,
          password: process.env.REDIS_PASSWORD,
          connectTimeout: 10000,
        },
      }),
    }),
    QuestionsModule,
    UsersModule,
    AuthModule,
    SseModule,
    LikesModule,
    PollingModule,
    LikesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
