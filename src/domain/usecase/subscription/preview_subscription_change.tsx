import {
  SubscriptionBillingPeriod,
  SubscriptionName,
} from "@yper-script/react/data/entity/subscription.entity";
import { SubscriptionPreview } from "@yper-script/react/data/entity/subscription_preview.entity";
import { ProSubscriptionRepository } from "@yper-script/react/data/repository/pro_subscription.repository";
import { GetCurrentProId } from "@yper-script/react/domain/usecase/get_current_pro_id";
import moment from "moment";
import { firstValueFrom } from "rxjs";

export class PreviewSubscriptionChange {
  /** Repository */
  private proSubscriptionRepository: ProSubscriptionRepository = new ProSubscriptionRepository();

  /** UseCase */
  private getCurrentProId: GetCurrentProId = new GetCurrentProId();

  static basePrices = {
    [SubscriptionName.yper_start]: 0,
    [SubscriptionName.yper_essential]: 30,
    [SubscriptionName.yper_premium]: 60,
  };

  public async call(
    subscription: SubscriptionName,
    billingPeriod: SubscriptionBillingPeriod
  ): Promise<SubscriptionPreview> {
    if (subscription == SubscriptionName.yper_start) {
      return {
        rpQuantity: 1,
        amount: 0,
        dueDate: new Date(),
      };
    }
    let preview = await this.proSubscriptionRepository.previewSubscription(
      await firstValueFrom(this.getCurrentProId()),
      subscription,
      billingPeriod
    );
    const rpQuantity = preview.rpQuantity == 0 ? 1 : preview.rpQuantity;
    return {
      rpQuantity: rpQuantity,
      amount:
        preview.amount ??
        PreviewSubscriptionChange.basePrices[subscription] *
          rpQuantity *
          (billingPeriod == SubscriptionBillingPeriod.annually ? 10 : 1),
      dueDate: preview.dueDate ?? new Date(),
    };
  }
}
