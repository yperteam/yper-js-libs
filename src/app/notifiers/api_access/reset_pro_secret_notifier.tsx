import { Society } from "../../../data/entity/society.entity";
import { ResetProSecret } from "../../../domain/usecase/pro/reset_pro_secret";
import { atom, CallbackInterface, Loadable, RecoilLoadable } from "recoil";
import { CustomLoadable } from "../custom_loadable";
import { CurrentProNotifier } from "../pro/current_pro_notifier";

export class ResetProSecretNotifier {
  static provider = atom<Loadable<void>>({
    key: "reset-pro-secret",
    default: null,
  });

  static notifier = async (callback: CallbackInterface) => {
    callback.set(ResetProSecretNotifier.provider, RecoilLoadable.loading);
    callback.set(
      ResetProSecretNotifier.provider,
      await CustomLoadable.guard(async () => {
        await new ResetProSecret().call();
        return callback.refresh(CurrentProNotifier.provider);
      })
    );
  };
}
