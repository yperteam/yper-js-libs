import CallableInstance from "callable-instance";
import { SupportRepository } from "../../../data/repository/support.repository";
import { from, Observable, switchMap } from "rxjs";
import { PhoneCallRequest } from "../../../data/entity/phone_call_request.entity";
import { UserRepository } from "../../../data/repository/user.repository";

export class GetPhoneCallRequest extends CallableInstance<
  [],
  Observable<PhoneCallRequest[]>
> {
  private repository = new SupportRepository();
  private userRepository = new UserRepository();

  constructor() {
    super("instanceMethod");
  }

  public getCallerType() {
    return "pro";
  }

  public instanceMethod(): Observable<PhoneCallRequest[]> {
    return from(this.userRepository.getCurrentUserId()).pipe(
      switchMap(id =>
        this.repository.getPhoneCallRequests(id, this.getCallerType())
      )
    );
  }
}
