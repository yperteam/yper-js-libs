import { ProDeliverer } from "../../../data/entity/pro_deliverer.entity";
export declare class GetProDeliverer {
    /** Repository */
    private proRepository;
    /** UseCase */
    private getCurrentProId;
    call(filter: string): Promise<ProDeliverer[]>;
}
