import CallableInstance from "callable-instance";
import { SupportRepository } from "../../../data/repository/support.repository";
import { firstValueFrom } from "rxjs";
import { PhoneCallRequest } from "../../../data/entity/phone_call_request.entity";
import { GetCurrentProId } from "../pro/get_current_pro_id";
import { WatchCurrentUser } from "../user/watch_current_user";

export class RequestPhoneCall extends CallableInstance<
  [string, string, string],
  Promise<PhoneCallRequest>
> {
  private repository = new SupportRepository();

  constructor() {
    super("instanceMethod");
  }

  private async getCallerId(): Promise<string> {
    return process.env.YPER_APP_NAME == "ypershop"
      ? firstValueFrom(new GetCurrentProId()())
      : (await firstValueFrom(new WatchCurrentUser()())).id;
  }

  private getCallerType(): string {
    return process.env.YPER_APP_NAME == "ypershop" ? "pro" : "customer";
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
