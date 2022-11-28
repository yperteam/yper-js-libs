import { NotificationRepository } from "@yper-script/react/data/repository/notification.repository";
import { GetCurrentRetailpointId } from "@yper-script/react/domain/usecase/get_current_retailpoint_id";
import { firstValueFrom } from "rxjs";
import { GetCurrentUserId } from "../get_current_user_id";

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
