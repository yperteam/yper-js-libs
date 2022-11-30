import { selector } from "recoil";
import { GetRetailpointDeliveriesDistribution } from "../../../domain/usecase/retailpoint/get_retailpoint_deliveries_distribution";
import { StatsRangeNotifier } from "../../../app/notifiers/stats_range_notifier";
import { StatsDeliveriesIntervalNotifier } from "../../../app/notifiers/stats_deliveries_interval_notifier";
import { DatedStatNumber } from "../../../domain/model/dated_stat_number";
import { DatedStatsNotifier } from "../../../app/notifiers/dated_stats_notifier";

export class RetailpointDeliveryDistributionNotifier {
  static currentProvider = selector<DatedStatNumber[]>({
    key: "current-retailpointDeliveryDistributionNotifier",
    get: async ({ get }) => {
      let range = get(StatsRangeNotifier.provider);
      let interval = get(StatsDeliveriesIntervalNotifier.provider);
      let distribution = await new GetRetailpointDeliveriesDistribution().call(
        range.begin,
        range.end,
        interval
      );
      return DatedStatsNotifier.getFormattedValues(
        distribution,
        interval,
        range.begin,
        range.end
      );
    },
    //Todo: To change cache handle policy update
    cachePolicy_UNSTABLE: { eviction: "most-recent" },
  });

  static previousProvider = selector<DatedStatNumber[]>({
    key: "previous-retailpointDeliveryDistributionNotifier",
    get: async ({ get }) => {
      let range = get(StatsRangeNotifier.provider);
      let interval = get(StatsDeliveriesIntervalNotifier.provider);
      let { begin, end } = DatedStatsNotifier.getPreviousRange(interval, range);
      let distribution = await new GetRetailpointDeliveriesDistribution().call(
        begin,
        end,
        interval
      );
      return DatedStatsNotifier.getFormattedValues(
        distribution,
        interval,
        begin,
        end
      );
    },
    //Todo: To change cache handle policy update
    cachePolicy_UNSTABLE: { eviction: "most-recent" },
  });
}
