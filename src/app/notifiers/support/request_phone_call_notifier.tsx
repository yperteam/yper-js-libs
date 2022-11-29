import { atom, CallbackInterface, Loadable } from "recoil";
import { CustomLoadable } from "../../../app/notifiers/custom_loadable";
import { RequestPhoneCall } from "../../../domain/usecase/support/request_phone_call";
import { PhoneCallRequest } from "../../../data/entity/phone_call_request.entity";

export class RequestPhoneCallNotifier {
  static provider = atom<Loadable<PhoneCallRequest>>({
    key: "request_phone_call_provider",
    default: null,
  });

  static notifier = async (
    reasonId: string,
    phoneNumber: string,
    callback: CallbackInterface,
    comment?: string
  ) => {
    callback.set(RequestPhoneCallNotifier.provider, CustomLoadable.loading);
    const usecase = new RequestPhoneCall();
    callback.set(
      RequestPhoneCallNotifier.provider,
      await CustomLoadable.guard(async () =>
        usecase(reasonId, phoneNumber, comment)
      )
    );
  };
}
