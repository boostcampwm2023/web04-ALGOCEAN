import { Module } from '@nestjs/common';
import { AlarmController } from './alarm.controller';
import { AlarmService } from './alarm.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [AlarmController],
  providers: [AlarmService, PrismaService],
})
export class AlarmModule {}
