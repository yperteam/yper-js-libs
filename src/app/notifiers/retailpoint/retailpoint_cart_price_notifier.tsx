import { selector } from "recoil";
import { StatsRangeNotifier } from "../../../app/notifiers/stats_range_notifier";
import { StatsDeliveriesIntervalNotifier } from "../../../app/notifiers/stats_deliveries_interval_notifier";
import { GetRetailpointCartPrice } from "../../../domain/usecase/retailpoint/get_retailpoint_cart_price";
import DatedStatNumber from "../../../domain/model/dated_stat_number";
import DatedStatsNotifier from "../../../app/notifiers/dated_stats_notifier";

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
