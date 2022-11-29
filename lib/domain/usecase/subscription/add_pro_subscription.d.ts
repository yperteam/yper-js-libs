import { SubscriptionBillingPeriod, SubscriptionName } from "../../../data/entity/subscription.entity";
import { CustomError } from "ts-custom-error";
export declare class AddProSubscription {
    /** Repository */
    private proSubscriptionRepository;
    /** UseCase */
    private getCurrentProId;
    private getPaymentMethods;
    call(name: SubscriptionName, billingPeriod: SubscriptionBillingPeriod): Promise<void>;
}
export declare class NoPaymentMethodRegistered extends CustomError {
    constructor();
}
