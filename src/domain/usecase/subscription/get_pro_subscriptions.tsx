import { firstValueFrom } from "rxjs";
import {
  ProSubscription,
  SubscriptionBillingPeriod,
  SubscriptionName,
  SubscriptionStatus,
} from "../../../data/entity/subscription.entity";
import { ProSubscriptionRepository } from "../../../data/repository/pro_subscription.repository";
import { GetCurrentProId } from "../pro/get_current_pro_id";

export class GetProSubscriptions {
  /** Repository */
  private proSubscriptionRepository: ProSubscriptionRepository = new ProSubscriptionRepository();

  /** UseCase */
  private getCurrentProId: GetCurrentProId = new GetCurrentProId();

  public async call(): Promise<ProSubscription[]> {
    let res = await this.proSubscriptionRepository.getSubscriptions(
      await firstValueFrom(this.getCurrentProId())
    );
    if (res.length == 0 || !res[res.length - 1].autoRenew) {
      return [
        ...res,
        {
          id: "",
          autoRenew: true,
          createdAt: null,
          startDate: null,
          endDate: null,
          status: SubscriptionStatus.active,
          billingPeriod: SubscriptionBillingPeriod.annually,
          name: SubscriptionName.yper_start,
        },
      ];
    }
    return res;
  }
}
