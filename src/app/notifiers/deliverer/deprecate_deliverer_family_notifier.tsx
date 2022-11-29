import { atomFamily, CallbackInterface } from "recoil";
import { ProDeprecateShopper } from "../../../domain/usecase/deliverer/pro_deprecate_shopper";
import { DelivererDialogProvider } from "../../../app/notifiers/deliverer/deliverer_dialog_notifier";
import { ProBlockedDelivererNotifier } from "../../../app/notifiers/deliverer/pro_blocked_deliverer_notifier";
import { CustomLoadable } from "../../../app/notifiers/custom_loadable";
import { DelivererErrorEnum } from "../../../app/screen/deliverer/modal/error_modal";

export class DeprecateDelivererNotifier {
  static provider = atomFamily<any, any>({
    key: "deprecate_deliverer_provider",
    default: {},
  });

  static notifier = async (deliverer: any, callback: CallbackInterface) => {
    callback.set(
      DeprecateDelivererNotifier.provider(deliverer.id),
      CustomLoadable.loading
    );
    const loadable = await CustomLoadable.guard(async () => {
      await new ProDeprecateShopper().call(deliverer.id);
      callback.set(DelivererDialogProvider.dialogDeprecatedProvider, {
        show: false,
        deliverer: {},
      });
      callback.set(DelivererDialogProvider.dialogDeprecatedSuccessProvider, {
        show: true,
        delivererName: deliverer.nickname,
      });
      return;
    });
    callback.set(DeprecateDelivererNotifier.provider(deliverer.id), loadable);
    if (loadable.state === "hasError") {
      callback.set(DelivererDialogProvider.dialogDeprecatedProvider, {
        show: false,
        deliverer: {},
      });
      callback.set(DelivererDialogProvider.dialogErrorProvider, {
        show: true,
        type: DelivererErrorEnum.deprecate,
      });
    }
  };
}
