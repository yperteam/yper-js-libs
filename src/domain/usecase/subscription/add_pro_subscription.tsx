import {
  SubscriptionBillingPeriod,
  SubscriptionName,
} from "../../../data/entity/subscription.entity";
import { CustomError } from "ts-custom-error";
import { ProSubscriptionRepository } from "../../../data/repository/pro_subscription.repository";
import { GetCurrentProId } from "../pro/get_current_pro_id";
import { firstValueFrom } from "rxjs";
import { GetPaymentMethods } from "../payment_methods/get_payment_methods";
import { GetProSubscriptions } from "./get_pro_subscriptions";
import { PreviewSubscriptionChange } from "./preview_subscription_change";
import moment from "moment";
import { loadStripe } from "@stripe/stripe-js";

export class AddProSubscription {
  /** Repository */
  private proSubscriptionRepository: ProSubscriptionRepository = new ProSubscriptionRepository();

  /** UseCase */
  private getCurrentProId: GetCurrentProId = new GetCurrentProId();
  private getPaymentMethods: GetPaymentMethods = new GetPaymentMethods();

  public async call(
    name: SubscriptionName,
    billingPeriod: SubscriptionBillingPeriod
  ): Promise<void> {
    const subscriptions = await new GetProSubscriptions().call();
    const currentSubscription = subscriptions[0];
    const proId = await firstValueFrom(this.getCurrentProId());

    if (name != SubscriptionName.yper_start) {
      const methods = await firstValueFrom(this.getPaymentMethods());
      const preview = await new PreviewSubscriptionChange().call(
        name,
        billingPeriod
      );
      const payNow = moment(preview.dueDate).isSame(new Date(), "day");
      if (methods.length == 0 && preview.amount > 0 && payNow)
        throw new NoPaymentMethodRegistered();

      try {
        if (currentSubscription.name != SubscriptionName.yper_start) {
          await this.proSubscriptionRepository.editSubscription(
            proId,
            name,
            billingPeriod
          );
        } else {
          await this.proSubscriptionRepository.addSubscription(
            proId,
            name,
            billingPeriod
          );
        }
      } catch (e) {
        // TODO put it in a usecase
        if (e.result.paymentIntentClientSecret) {
          const stripe = await loadStripe(process.env.STRIPE_PUBLIC_KEY);
          await stripe.confirmCardPayment(e.result.paymentIntentClientSecret);
        } else {
          throw e;
        }
      }
    } else {
      await this.proSubscriptionRepository.cancelSubscription(
        currentSubscription.id
      );
    }
  }
}

export class NoPaymentMethodRegistered extends CustomError {
  constructor() {
    super("NoPaymentMethodRegistered");
  }
}
