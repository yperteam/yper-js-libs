import { NotificationResponse } from "../entity/notification.entity";
export declare class NotificationRepository {
    private api;
    getNotifications(userId: string, retailpointId: string, skip: number, limit: number): Promise<NotificationResponse>;
    readNotification(userId: string, notificationId: string): Promise<void>;
    readAllNotifications(userId: string, retailpointId: string): Promise<void>;
    unreadNotificationNumber(userId: string, retailpointId: string): Promise<number>;
}
