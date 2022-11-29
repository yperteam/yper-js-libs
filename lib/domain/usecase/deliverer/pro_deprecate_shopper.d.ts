import { BlockedDeliverer } from "../../../data/entity/pro_deliverer.entity";
export declare class ProDeprecateShopper {
    /** Repository */
    private proRepository;
    /** UseCase */
    private getCurrentProId;
    call(delivererId: string): Promise<BlockedDeliverer>;
}
