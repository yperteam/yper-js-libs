import { NotificationRepository } from "../../../data/repository/notification.repository";
import { GetCurrentRetailpointId } from "../../../domain/usecase/retailpoint/get_current_retailpoint_id";
import CallableInstance from "callable-instance";
import { combineLatest, Observable, switchMap } from "rxjs";
import { WatchCurrentUser } from "../user/watch_current_user";

export class GetUnreadRetailpointNotification extends CallableInstance<
  [],
  Observable<number>
> {
  private repository: NotificationRepository = new NotificationRepository();
  private getCurrentRetailPointId: GetCurrentRetailpointId = new GetCurrentRetailpointId();
  private watchCurrentUser: WatchCurrentUser = new WatchCurrentUser();

  constructor() {
    super("instanceMethod");
  }

  public instanceMethod(): Observable<number> {
    return combineLatest([
      this.getCurrentRetailPointId(),
      this.watchCurrentUser(),
    ]).pipe(
      switchMap(values =>
        this.repository.unreadNotificationNumber(values[1].id, values[0])
      )
    );
  }
}
