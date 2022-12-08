import { NotificationRepository } from "../../../data/repository/notification.repository";
import { GetCurrentRetailpointId } from "../../../domain/usecase/retailpoint/get_current_retailpoint_id";
import { firstValueFrom } from "rxjs";
import { WatchCurrentUser } from "../user/watch_current_user";

export class ReadAllRetailpointNotifications {
  private repository: NotificationRepository = new NotificationRepository();
  private getCurrentRetailPointId: GetCurrentRetailpointId = new GetCurrentRetailpointId();
  private watchCurrentUser: WatchCurrentUser = new WatchCurrentUser();

  public async call() {
    const retailpointId = await firstValueFrom(this.getCurrentRetailPointId());
    const user = await firstValueFrom(this.watchCurrentUser());
    this.repository.readAllNotifications(user.id, retailpointId);
  }
}
