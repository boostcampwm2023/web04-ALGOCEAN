import { Module } from '@nestjs/common';
import { CrawlerController } from './crawler.controller';
import { CrawlerService } from './crawler.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [CrawlerController],
  providers: [CrawlerService, PrismaService],
})
export class CrawlerModule {}
