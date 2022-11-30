import { StatsInterval } from "../../../data/entity/stats_interval.enum";
import { DatedStatNumber } from "../../model/dated_stat_number";
export declare class GetRetailpointCartPrice {
    /** Repository */
    private proRepository;
    /** UseCase */
    private getCurrentProId;
    private getCurrentRetailPoint;
    call(begin: Date, end: Date, interval: StatsInterval): Promise<DatedStatNumber[]>;
}
