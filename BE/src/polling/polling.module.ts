import { Module } from '@nestjs/common';
import { PollingService } from './polling.service';
import { PollingController } from './polling.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [PollingService, PrismaService],
  controllers: [PollingController],
})
export class PollingModule {}
