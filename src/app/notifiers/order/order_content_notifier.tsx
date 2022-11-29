import { atomFamily, CallbackInterface, Loadable } from "recoil";
import { CustomLoadable } from "../../../app/notifiers/custom_loadable";
import { EditPrebookContent } from "../../../domain/usecase/order/edit_prebook_content";
import { MissionTemplateNotifier } from "../../../app/notifiers/order/mission_template_notifier";

export class OrderContentNotifier {
  static provider = atomFamily<Loadable<void>, string>({
    key: "order_content_provider",
    default: null,
  });

  //TOdo : Options as Enum (declage prod/BETA)
  static notifier = async (
    orderId: string,
    prebookId: string,
    product: string,
    options: string[],
    itemsNb: number,
    price: number,
    callback: CallbackInterface
  ) => {
    callback.set(
      OrderContentNotifier.provider(orderId),
      CustomLoadable.loading
    );
    callback.set(
      OrderContentNotifier.provider(orderId),
      await CustomLoadable.guard(async () =>
        new EditPrebookContent().call({
          prebookId: prebookId,
          options: options,
          product: product,
          price: price,
          itemsNb: itemsNb,
        })
      )
    );
  };
}
