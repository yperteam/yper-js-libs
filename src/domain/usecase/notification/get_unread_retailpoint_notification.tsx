import { NotificationRepository } from "../../../data/repository/notification.repository";
import { GetCurrentRetailpointId } from "../../../domain/usecase/retailpoint/get_current_retailpoint_id";
import CallableInstance from "callable-instance";
import { combineLatest, Observable, switchMap } from "rxjs";
import { GetCurrentUserId } from "../user/get_current_user_id";

export class GetUnreadRetailpointNotification extends CallableInstance<
  [],
  Observable<number>
> {
  private repository: NotificationRepository = new NotificationRepository();
  private getCurrentRetailPointId: GetCurrentRetailpointId = new GetCurrentRetailpointId();
  private getCurrentUserId: GetCurrentUserId = new GetCurrentUserId();

  constructor() {
    super("instanceMethod");
  }

  public instanceMethod(): Observable<number> {
    return combineLatest([
      this.getCurrentRetailPointId(),
      this.getCurrentUserId(),
    ]).pipe(
      switchMap(values =>
        this.repository.unreadNotificationNumber(values[1], values[0])
      )
    );
  }
}