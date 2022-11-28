import { Api } from "../provider/http/api";
import { NotificationResponse } from "../entity/notification.entity";

export class NotificationRepository {
  private api = new Api();

  public getNotifications(
    userId: string,
    retailpointId: string,
    skip: number,
    limit: number
  ): Promise<NotificationResponse> {
    return this.api.getNotifications(userId, retailpointId, skip, limit);
  }

  public readNotification(
    userId: string,
    notificationId: string
  ): Promise<void> {
    return this.api.postReadNotification(userId, notificationId);
  }

  public readAllNotifications(
    userId: string,
    retailpointId: string
  ): Promise<void> {
    return this.api.postReadAllNotifications(userId, retailpointId);
  }

  public async unreadNotificationNumber(
    userId: string,
    retailpointId: string
  ): Promise<number> {
    const res = await this.api.getUnreadNotificationNumber(
      userId,
      retailpointId
    );
    return res.unreadNumber;
  }
}
