import CallableInstance from "callable-instance";
import { SupportRepository } from "../../../data/repository/support.repository";
import { from, Observable, switchMap } from "rxjs";
import { PhoneCallRequest } from "../../../data/entity/phone_call_request.entity";
import { WatchCurrentUser } from "../user/watch_current_user";

export class GetPhoneCallRequest extends CallableInstance<
  [],
  Observable<PhoneCallRequest[]>
> {
  private repository = new SupportRepository();
  private watchCurrentUser = new WatchCurrentUser();

  constructor() {
    super("instanceMethod");
  }

  public getCallerType() {
    return process.env.YPER_APP_NAME == "ypershop" ? "pro" : "customer";
  }

  public instanceMethod(): Observable<PhoneCallRequest[]> {
    return from(this.watchCurrentUser()).pipe(
      switchMap(user =>
        this.repository.getPhoneCallRequests(user.id, this.getCallerType(), ["created", "pending", "processing"])
      )
    );
  }
}
