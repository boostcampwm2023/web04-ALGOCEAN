import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlarmModule } from './alarm/alarm.module';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    AlarmModule,
    RedisModule.forRootAsync({
      useFactory: () => ({
        config: {
          url: process.env.REDIS_URL,
          password: process.env.REDIS_PASSWORD,
          connectTimeout: 10000,
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
