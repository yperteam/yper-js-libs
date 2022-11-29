import { PaymentMethod } from "../../../data/entity/payment_method.entity";
import { GetPaymentMethods } from "../../../domain/usecase/payment_methods/get_payment_methods";
import { StreamNotifier } from "../../../app/notifiers/stream_notifier";

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
