import { atomFamily, CallbackInterface } from "recoil";
import { ProDeprecateShopper } from "../../../domain/usecase/deliverer/pro_deprecate_shopper";
import { CustomLoadable } from "../custom_loadable";
import { DelivererDialogProvider, DelivererErrorEnum } from "./deliverer_dialog_notifier";

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
