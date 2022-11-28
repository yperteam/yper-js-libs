import { atomFamily, CallbackInterface, Loadable } from "recoil";
import { CustomLoadable } from "@yper-script/react/app/notifiers/custom_loadable";
import { PayOrder } from "@yper-script/react/domain/usecase/order/pay_order";

export class OrderPaymentNotifier {
  static provider = atomFamily<Loadable<void>, string>({
    key: "order_payment_provider",
    default: null,
  });

  static notifier = async (
    orderId: string,
    callback: CallbackInterface,
    paymentId?: string
  ) => {
    callback.set(
      OrderPaymentNotifier.provider(orderId),
      CustomLoadable.loading
    );
    callback.set(
      OrderPaymentNotifier.provider(orderId),
      await CustomLoadable.guard(async () =>
        new PayOrder().call(orderId, paymentId)
      )
    );
  };
}
