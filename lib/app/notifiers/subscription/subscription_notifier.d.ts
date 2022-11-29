import { ProSubscription } from "../../../data/entity/subscription.entity";
export declare class ProSubscriptionsNotifier {
    static provider: import("recoil").RecoilValueReadOnly<ProSubscription[]>;
    static dialogProvider: import("recoil").RecoilState<boolean>;
}
