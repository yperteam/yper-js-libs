import { ProStats } from "../../../data/entity/pro_retailpoint_stats.entity";
export declare class GetProRetailpointsStats {
    /** Repository */
    private proRepository;
    /** UseCase */
    private getCurrentProId;
    call(retailpointIds: string[], begin: Date, end: Date): Promise<ProStats[]>;
}
