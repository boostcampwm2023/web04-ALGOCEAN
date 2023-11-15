import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnswersModule } from './answers/answers.module';

@Module({
  imports: [AnswersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
