import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PollingService {
  constructor(private prismaService: PrismaService) {}

  async getNotification(userId: number) {
    const notification = await this.prismaService.notification.findMany({
      where: {
        UserId: userId,
        IsRead: false,
      },
    });

    await this.prismaService.notification.updateMany({
      where: {
        UserId: userId,
        IsRead: false,
      },
      data: {
        IsRead: true,
      },
    });

    return notification;
  }
}
