import { Module, Provider } from '@nestjs/common';
import { SseController } from './sse.controller';
import { PrismaService } from '../prisma.service';
import { SseService } from './sse.service';
import { ReplaySubject } from 'rxjs';

const userNotificationsProvider: Provider = {
  provide: 'USER_NOTIFICATIONS_MAP',
  useValue: new Map<number, ReplaySubject<string>[]>(),
};

const userPendingNotificationsProvider: Provider = {
  provide: 'USER_PENDING_NOTIFICATIONS_MAP',
  useValue: new Map<number, ReplaySubject<string>[]>(),
};

@Module({
  controllers: [SseController],
  providers: [
    PrismaService,
    SseService,
    userNotificationsProvider,
    userPendingNotificationsProvider,
  ],
  exports: [
    SseService,
    userNotificationsProvider,
    userPendingNotificationsProvider,
  ],
})
export class SseModule {}
