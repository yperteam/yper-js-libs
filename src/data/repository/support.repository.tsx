import { Api } from "../provider/http/api";
import { ProStorage } from "../provider/local/pro_storage";
import { PhoneCallRequest } from "../entity/phone_call_request.entity";
import { CallRequestStorage } from "../provider/local/call_request_storage";
import { firstValueFrom, from, Observable, switchMap } from "rxjs";
import { ContactReasonEntity } from "../entity/contact_reason.entity";

export class SupportRepository {
  private api = new Api();

  private proStorage = ProStorage.instance;

  public getContactReasons(
    userGroups: string[]
  ): Promise<ContactReasonEntity[]> {
    return this.api.getSupportContactReasons(userGroups);
  }

  public getPhoneCallRequest(requestId: string): Promise<PhoneCallRequest> {
    return this.api.getPhoneCallRequest(requestId);
  }

  public getPhoneCallRequests(
    userId: string,
    callerType: string
  ): Observable<PhoneCallRequest[]> {
    return from(
      this.api.getPhoneCallRequests(
        userId,
        ["created", "pending", "processing"],
        callerType
      )
    ).pipe(
      switchMap(list => {
        CallRequestStorage.instance.set(list);
        return CallRequestStorage.instance.get();
      })
    );
  }

  public async requestPhoneCall(props: {
    callerId: string;
    phoneNumber: string;
    reasonId: string;
    callerType: string;
    comment?: string;
  }): Promise<PhoneCallRequest> {
    const call = await this.api.requestPhoneCall(props);
    const list = await firstValueFrom(CallRequestStorage.instance.get());
    CallRequestStorage.instance.set([...list, call]);
    return call;
  }

  public async cancelPhoneCallRequest(requestId: string) {
    await this.api.cancelPhoneCallRequest(requestId);
    const list = await firstValueFrom(CallRequestStorage.instance.get());
    CallRequestStorage.instance.set(list.filter(l => l.id != requestId));
  }
}
