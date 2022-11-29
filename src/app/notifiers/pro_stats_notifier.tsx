import { selector } from "recoil";
import { ProRetailpointStats } from "../../data/entity/pro_retailpoint_stats.entity";
import { GetProStats } from "../../domain/usecase/pro/get_pro_stats";
import { ProRetailpointsNotifier } from "./retailpoint/pro_retailpoints_notifier";
import { ProRetailpointsStatsNotifier } from "./retailpoint/pro_retailpoints_stats_notifier";
import { StatsRangeNotifier } from "./stats_range_notifier";

export class ProStatsNotifier {
  static provider = selector<ProRpStats>({
    key: "current-proStats",
    get: async ({ get }) => {
      let range = get(StatsRangeNotifier.provider);
      let retailpointsIds = get(
        ProRetailpointsNotifier.retailpointListProvider
      );
      let activeRps = get(ProRetailpointsStatsNotifier.activeRetailPointsList);

      let stats = await new GetProStats().call(
        range.begin,
        range.end,
        retailpointsIds
      );
      return {
        count: activeRps.length,
        ...stats,
      };
    },
    //Todo: To change cache handle policy update
    cachePolicy_UNSTABLE: { eviction: "most-recent" },
  });
}

interface ProRpStats extends ProRetailpointStats {
  count: number;
}