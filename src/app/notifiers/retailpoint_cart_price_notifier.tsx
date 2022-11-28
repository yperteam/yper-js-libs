import { selector } from "recoil";
import { GetRetailpointDeliveriesDistribution } from "@yper-script/react/domain/usecase/get_retailpoint_deliveries_distribution";
import { StatsRangeNotifier } from "@yper-script/react/app/notifiers/stats_range_notifier";
import { StatsDeliveriesIntervalNotifier } from "@yper-script/react/app/notifiers/stats_deliveries_interval_notifier";
import { GetRetailpointCartPrice } from "@yper-script/react/domain/usecase/get_retailpoint_cart_price";
import DatedStatNumber from "@yper-script/react/domain/model/dated_stat_number";
import DatedStatsNotifier from "@yper-script/react/app/notifiers/dated_stats_notifier";
import { StatsInterval } from "@yper-script/react/data/entity/stats_interval.enum";

export class RetailpointCartPriceNotifier {
  static currentProvider = selector<DatedStatNumber[]>({
    key: "current-proRetailPointStatsCartPrice",
    get: async ({ get }) => {
      let range = get(StatsRangeNotifier.provider);
      let interval = get(StatsDeliveriesIntervalNotifier.provider);
      let cartPrice = await new GetRetailpointCartPrice().call(
        range.begin,
        range.end,
        interval
      );
      return DatedStatsNotifier.getFormattedValues(
        cartPrice,
        interval,
        range.begin,
        range.end
      );
    },
    //Todo: To change cache handle policy update
    cachePolicy_UNSTABLE: { eviction: "most-recent" },
  });

  static previousProvider = selector<DatedStatNumber[]>({
    key: "previous-proRetailPointStatsCartPrice",
    get: async ({ get }) => {
      let range = get(StatsRangeNotifier.provider);
      let interval = get(StatsDeliveriesIntervalNotifier.provider);
      let { begin, end } = DatedStatsNotifier.getPreviousRange(interval, range);
      let cartPrice = await new GetRetailpointCartPrice().call(
        begin,
        end,
        interval
      );
      return DatedStatsNotifier.getFormattedValues(
        cartPrice,
        interval,
        begin,
        end
      );
    },
    //Todo: To change cache handle policy update
    cachePolicy_UNSTABLE: { eviction: "most-recent" },
  });
}
