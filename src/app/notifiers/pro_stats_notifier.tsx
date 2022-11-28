import { selector } from "recoil";
import { ProRetailpointStats } from "@yper-script/react/data/entity/pro_retailpoint_stats.entity";
import { StatsRangeNotifier } from "@yper-script/react/app/notifiers/stats_range_notifier";
import { GetProStats } from "@yper-script/react/domain/usecase/get_pro_stats";
import { ProRetailpointsStatsNotifier } from "@yper-script/react/app/notifiers/retailpoint/pro_retailpoints_stats_notifier";
import { ProRetailpointsNotifier } from "@yper-script/react/app/notifiers/retailpoint/pro_retailpoints_notifier";

export class ProStatsNotifier {
  static provider = selector<ProRetailpointStats>({
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

      stats["count"] = activeRps.length;

      return stats;
    },
    //Todo: To change cache handle policy update
    cachePolicy_UNSTABLE: { eviction: "most-recent" },
  });
}
