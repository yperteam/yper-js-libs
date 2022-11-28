import { NotificationRepository } from "@yper-script/react/data/repository/notification.repository";
import { NotificationResponse } from "@yper-script/react/data/entity/notification.entity";
import { GetCurrentRetailpointId } from "@yper-script/react/domain/usecase/get_current_retailpoint_id";
import { GetCurrentUserId } from "../get_current_user_id";
import { Observable, timer } from "rxjs";
import { withLatestFrom, switchMap } from "rxjs/operators";

export class GetRetailpointNotification {
  private repository: NotificationRepository = new NotificationRepository();
  private getCurrentUserId: GetCurrentUserId = new GetCurrentUserId();
  private getCurrentRetailPointId: GetCurrentRetailpointId = new GetCurrentRetailpointId();

  public call(skip: number, limit: number): Observable<NotificationResponse> {
    return this.getCurrentRetailPointId().pipe(
      withLatestFrom(this.getCurrentUserId()),
      switchMap(([retailpointId, userId]) =>
        this.repository.getNotifications(userId, retailpointId, skip, limit)
      )
    );
  }
}
