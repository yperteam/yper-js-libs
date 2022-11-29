import { ProRetailpointStats } from "src/data/entity/pro_retailpoint_stats.entity";
export declare class GetProStats {
    /** Repository */
    private proRepository;
    /** UseCase */
    private getCurrentProId;
    call(begin: Date, end: Date, retailpointsIds: string[]): Promise<ProRetailpointStats>;
}
