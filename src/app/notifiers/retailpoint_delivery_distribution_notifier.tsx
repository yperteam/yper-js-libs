import { selector } from "recoil";
import { GetRetailpointDeliveriesDistribution } from "@yper-script/react/domain/usecase/get_retailpoint_deliveries_distribution";
import {
  DateRangeInterface,
  StatsRangeNotifier,
} from "@yper-script/react/app/notifiers/stats_range_notifier";
import { StatsDeliveriesIntervalNotifier } from "@yper-script/react/app/notifiers/stats_deliveries_interval_notifier";
import DatedStatNumber from "@yper-script/react/domain/model/dated_stat_number";
import DatedStatsNotifier from "@yper-script/react/app/notifiers/dated_stats_notifier";
import { StatsInterval } from "@yper-script/react/data/entity/stats_interval.enum";
import moment from "moment";

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
