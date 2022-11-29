import { atomFamily, CallbackInterface } from "recoil";
import { FormattedProDeliverer } from "../../../domain/model/formated_deliverer.model";
import { ProLikeShopper } from "../../../domain/usecase/deliverer/pro_like_shopper";
import { CustomLoadable } from "../custom_loadable";
import { DelivererDialogProvider, DelivererErrorEnum } from "./deliverer_dialog_notifier";

export class LikeDelivererNotifier {
  static provider = atomFamily<any, any>({
    key: "like_deliverer_notifier",
    default: {},
  });

  static notifier = async (
    deliverer: FormattedProDeliverer,
    callback: CallbackInterface
  ) => {
    callback.set(
      LikeDelivererNotifier.provider(deliverer.id),
      CustomLoadable.loading
    );
    const loadable = await CustomLoadable.guard(async () => {
      await new ProLikeShopper().call(deliverer.id, deliverer.type);
      callback.set(DelivererDialogProvider.dialogFavoriteProvider, {
        show: true,
        delivererName: deliverer.nickname,
        type: "add",
      });
    });
    callback.set(LikeDelivererNotifier.provider(deliverer.id), loadable);
    if (loadable.state === "hasError") {
      callback.set(DelivererDialogProvider.dialogErrorProvider, {
        show: true,
        type: DelivererErrorEnum.like,
      });
    }
  };
}
