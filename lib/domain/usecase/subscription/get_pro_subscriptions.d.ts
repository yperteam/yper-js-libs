import { ProSubscription } from "../../../data/entity/subscription.entity";
export declare class GetProSubscriptions {
    /** Repository */
    private proSubscriptionRepository;
    /** UseCase */
    private getCurrentProId;
    call(): Promise<ProSubscription[]>;
}
