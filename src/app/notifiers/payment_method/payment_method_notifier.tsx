import { PaymentMethod } from "@yper-script/react/data/entity/payment_method.entity";
import { GetPaymentMethods } from "@yper-script/react/domain/usecase/payment_methods/get_payment_methods";
import { StreamNotifier } from "@yper-script/react/app/notifiers/stream_notifier";

export class PaymentMethodNotifier {
  static provider = StreamNotifier.provider({
    key: "payment-method-provider",
    stream: new GetPaymentMethods()(),
  });

  static withTypeProvider = StreamNotifier.providerFamily<
    PaymentMethod[],
    string
  >({
    key: "payment-method-with-type-provider",
    stream: paymentType => new GetPaymentMethods().call(paymentType),
  });
}
