import { DateRangeInterface } from "./stats_range_notifier";
import { DatedStatNumber } from "../../domain/model/dated_stat_number";
import { StatsInterval } from "../../data/entity/stats_interval.enum";
export declare class DatedStatsNotifier {
    private static compareDates;
    private static getDates;
    static getFormattedValues(stats: DatedStatNumber[], interval: StatsInterval, begin: Date, end: Date): DatedStatNumber[];
    static getPreviousRange(interval: StatsInterval, range: DateRangeInterface): DateRangeInterface;
}
