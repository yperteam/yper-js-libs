import { NotificationRepository } from "../../../data/repository/notification.repository";
import { NotificationResponse } from "../../../data/entity/notification.entity";
import { GetCurrentRetailpointId } from "../../../domain/usecase/retailpoint/get_current_retailpoint_id";
import { WatchCurrentUser } from "../user/watch_current_user";
import { Observable } from "rxjs";
import { withLatestFrom, switchMap } from "rxjs/operators";

export class GetRetailpointNotification {
  private repository: NotificationRepository = new NotificationRepository();
  private watchCurrentUser: WatchCurrentUser = new WatchCurrentUser();
  private getCurrentRetailPointId: GetCurrentRetailpointId = new GetCurrentRetailpointId();

  public call(skip: number, limit: number): Observable<NotificationResponse> {
    return this.getCurrentRetailPointId().pipe(
      withLatestFrom(this.watchCurrentUser()),
      switchMap(([retailpointId, user]) =>
        this.repository.getNotifications(user.id, retailpointId, skip, limit)
      )
    );
  }
}
