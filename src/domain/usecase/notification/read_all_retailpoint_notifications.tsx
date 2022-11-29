import { NotificationRepository } from "../../../data/repository/notification.repository";
import { GetCurrentRetailpointId } from "../../../domain/usecase/retailpoint/get_current_retailpoint_id";
import { firstValueFrom } from "rxjs";
import { GetCurrentUserId } from "../user/get_current_user_id";

export class ReadAllRetailpointNotifications {
  private repository: NotificationRepository = new NotificationRepository();
  private getCurrentRetailPointId: GetCurrentRetailpointId = new GetCurrentRetailpointId();
  private getCurrentUserId: GetCurrentUserId = new GetCurrentUserId();

  public async call() {
    const retailpointId = await firstValueFrom(this.getCurrentRetailPointId());
    const userId = await firstValueFrom(this.getCurrentUserId());
    this.repository.readAllNotifications(userId, retailpointId);
  }
}
