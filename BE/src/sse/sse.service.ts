import { Inject, Injectable } from '@nestjs/common';
import { ReplaySubject } from 'rxjs';
import { SendAnswerDto } from './dto/send-answer.dto';

@Injectable()
export class SseService {
  constructor(
    @Inject('USER_NOTIFICATIONS_MAP')
    private userNotifications: Map<number, ReplaySubject<string>[]>,

    @Inject('USER_PENDING_NOTIFICATIONS_MAP')
    private userPendingNotifications: Map<number, ReplaySubject<string>[]>,
  ) {}
  sendNotificationToUser(userId: number, alarmMessage: SendAnswerDto) {
    if (this.userNotifications.has(userId)) {
      this.userNotifications.get(userId).forEach((userSubject) => {
        userSubject.next(JSON.stringify(alarmMessage));
      });
    } else {
      const stringifiedAlarmMessage = JSON.stringify(alarmMessage);
      const alarmSubject = new ReplaySubject<string>();
      alarmSubject.next(stringifiedAlarmMessage);

      const pendingNotifications =
        this.userPendingNotifications.get(userId) ?? [];
      pendingNotifications.push(alarmSubject);
      this.userPendingNotifications.set(userId, pendingNotifications);
    }
  }

  createSseStreamForUser(userId: number): ReplaySubject<string> {
    const userSubject = new ReplaySubject<string>(10);
    if (this.userNotifications.has(userId)) {
      this.userNotifications.get(userId).push(userSubject);
    } else {
      this.userNotifications.set(userId, [userSubject]);
    }
    this.sendPendingNotificationsToUser(userId);
    return userSubject;
  }

  removeSseStreamForUser(userId: number) {
    this.userNotifications.delete(userId);
  }

  sendPendingNotificationsToUser(userId: number) {
    if (this.userPendingNotifications.has(userId)) {
      const pendingNotifications = this.userPendingNotifications.get(userId);
      pendingNotifications.forEach((pendingNotification) => {
        pendingNotification.subscribe((notification) => {
          this.sendNotificationToUser(userId, JSON.parse(notification));
        });
      });
      this.userPendingNotifications.delete(userId);
    }
  }
}
