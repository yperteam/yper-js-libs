import CallableInstance from "callable-instance";
import { SupportRepository } from "@yper-script/react/data/repository/support.repository";
import { firstValueFrom } from "rxjs";
import { UserRepository } from "@yper-script/react/data/repository/user.repository";
import { PhoneCallRequest } from "@yper-script/react/data/entity/phone_call_request.entity";
import { ProRepository } from "@yper-script/react/data/repository/pro.repository";
import { GetCurrentPro } from "../get_current_pro";
import { GetCurrentProId } from "../get_current_pro_id";
import { GetCurrentUserId } from "../get_current_user_id";

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
