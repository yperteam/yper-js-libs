import { NotificationRepository } from "@yper-script/react/data/repository/notification.repository";

export class ReadNotification {
  private repository: NotificationRepository = new NotificationRepository();

  public async call(userId: string, notificationId: string): Promise<void> {
    return this.repository.readNotification(userId, notificationId);
  }
}
