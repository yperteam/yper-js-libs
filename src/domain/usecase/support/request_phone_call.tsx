import CallableInstance from "callable-instance";
import { SupportRepository } from "../../../data/repository/support.repository";
import { firstValueFrom } from "rxjs";
import { PhoneCallRequest } from "../../../data/entity/phone_call_request.entity";
import { GetCurrentProId } from "../pro/get_current_pro_id";
import { GetCurrentUserId } from "../user/get_current_user_id";

export class RequestPhoneCall extends CallableInstance<
  [string, string, string],
  Promise<PhoneCallRequest>
> {
  private repository = new SupportRepository();

  constructor() {
    super("instanceMethod");
  }

  // TODO base it on app env
  private getCallerId(): Promise<string> {
    return true
      ? firstValueFrom(new GetCurrentProId()())
      : firstValueFrom(new GetCurrentUserId()());
  }

  // TODO base it on app env
  private getCallerType(): string {
    return true ? "pro" : "customer";
  }

  public async instanceMethod(
    reasonId: string,
    phoneNumber: string,
    comment?: string
  ): Promise<PhoneCallRequest> {
    return this.repository.requestPhoneCall({
      callerId: await this.getCallerId(),
      phoneNumber: phoneNumber,
      reasonId: reasonId,
      callerType: this.getCallerType(),
      comment: comment,
    });
  }
}
