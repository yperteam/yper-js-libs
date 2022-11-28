import { atomFamily, CallbackInterface } from "recoil";
import { ProDislikeShopper } from "@yper-script/react/domain/usecase/deliverer/pro_dislike_shopper";
import { DelivererDialogProvider } from "@yper-script/react/app/notifiers/deliverer/deliverer_dialog_notifier";
import { CustomLoadable } from "@yper-script/react/app/notifiers/custom_loadable";
import { ProFavoriteDeliverersNotifier } from "@yper-script/react/app/notifiers/deliverer/pro_favorite_deliverers_notifier";
import { DelivererErrorEnum } from "@yper-script/react/app/screen/deliverer/modal/error_modal";
import { FormattedProDeliverer } from "@yper-script/react/domain/model/formated_deliverer.model";

export class DislikeDelivererFamilyNotifier {
  static provider = atomFamily<any, any>({
    key: "dislike_deliverer_family_notifier",
    default: {},
  });

  static notifier = async (
    deliverer: FormattedProDeliverer,
    callback: CallbackInterface
  ) => {
    callback.set(
      DislikeDelivererFamilyNotifier.provider(deliverer.id),
      CustomLoadable.loading
    );
    const loadable = await CustomLoadable.guard(async () => {
      await new ProDislikeShopper().call(deliverer.favoriteId);
      const list = await callback.snapshot.getPromise(
        ProFavoriteDeliverersNotifier.provider
      );
      callback.set(DelivererDialogProvider.dialogFavoriteProvider, {
        show: true,
        delivererName: deliverer.nickname,
        type: "remove",
      });
    });

    callback.set(
      DislikeDelivererFamilyNotifier.provider(deliverer.id),
      loadable
    );
    if (loadable.state === "hasError") {
      callback.set(DelivererDialogProvider.dialogErrorProvider, {
        show: true,
        type: DelivererErrorEnum.dislike,
      });
    }
  };
}
