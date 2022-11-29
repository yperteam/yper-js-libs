import { atom, CallbackInterface, Loadable } from "recoil";
import { CustomLoadable } from "../../../app/notifiers/custom_loadable";
import { CancelPhoneCall } from "../../../domain/usecase/support/cancel_phone_call";

export class CancelPhoneCallNotifier {
  static provider = atom<Loadable<void>>({
    key: "cancel_phone_call_provider",
    default: null,
  });

  static notifier = async (callId: string, callback: CallbackInterface) => {
    callback.set(CancelPhoneCallNotifier.provider, CustomLoadable.loading);
    const usecase = new CancelPhoneCall();
    callback.set(
      CancelPhoneCallNotifier.provider,
      await CustomLoadable.guard(async () => usecase(callId))
    );
  };
}
