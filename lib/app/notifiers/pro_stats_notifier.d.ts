import { ProRetailpointStats } from "../../data/entity/pro_retailpoint_stats.entity";
export declare class ProStatsNotifier {
    static provider: import("recoil").RecoilValueReadOnly<ProRpStats>;
}
interface ProRpStats extends ProRetailpointStats {
    count: number;
}
export {};
