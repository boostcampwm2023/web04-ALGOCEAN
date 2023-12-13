import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlarmModule } from './alarm/alarm.module';

@Module({
  imports: [AlarmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
