export declare class GetRetailpointStats {
    /** Repository */
    private proRepository;
    /** UseCase */
    private getCurrentProId;
    private getCurrentRetailPoint;
    call(begin: Date, end: Date): Promise<import("../../../data/entity/pro_retailpoint_stats.entity").ProRetailpointStats>;
}
