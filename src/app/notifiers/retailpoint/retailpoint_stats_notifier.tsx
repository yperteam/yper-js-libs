import { selector } from "recoil";
import { GetRetailpointStats } from "../../../domain/usecase/retailpoint/get_retailpoint_stats";
import { ProRetailpointStats } from "../../../data/entity/pro_retailpoint_stats.entity";
import { StatsRangeNotifier } from "../../../app/notifiers/stats_range_notifier";

export class RetailpointStatsNotifier {
  static provider = selector<ProRetailpointStats>({
    key: "current-proRetailPointStats",
    get: async ({ get }) => {
      let range = get(StatsRangeNotifier.provider);
      return await new GetRetailpointStats().call(range.begin, range.end);
    },
    //Todo: To change cache handle policy update
    cachePolicy_UNSTABLE: { eviction: "most-recent" },
  });
}
