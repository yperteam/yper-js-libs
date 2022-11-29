import { atomFamily, CallbackInterface } from "recoil";
import { ProLikeShopper } from "../../../domain/usecase/deliverer/pro_like_shopper";
import { DelivererDialogProvider } from "../../../app/notifiers/deliverer/deliverer_dialog_notifier";
import { CustomLoadable } from "../../../app/notifiers/custom_loadable";
import { DelivererErrorEnum } from "../../../app/screen/deliverer/modal/error_modal";
import { FormattedProDeliverer } from "../../../domain/model/formated_deliverer.model";

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
