import { PhoneCallRequest } from "../../../data/entity/phone_call_request.entity";
import { GetPhoneCallRequest } from "../../../domain/usecase/support/get_phone_call_request";
import { interval } from "rxjs";
import { StreamNotifier } from "../stream_notifier";

export class PhoneCallRequestNotifier {
  static provider = StreamNotifier.provider<PhoneCallRequest[]>({
    key: "phone-call-request-provider",
    stream: new GetPhoneCallRequest()(),
    interval: interval(20000),
  });
}
