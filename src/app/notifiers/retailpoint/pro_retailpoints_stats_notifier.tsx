import { selector } from "recoil";
import { StatsRangeNotifier } from "../../../app/notifiers/stats_range_notifier";
import { GetProRetailpointsStats } from "../../../domain/usecase/get_pro_retailpoints_stats";
import { ProRetailpointsNotifier } from "../../../app/notifiers/retailpoint/pro_retailpoints_notifier";
import { ProStats } from "../../../data/entity/pro_retailpoint_stats.entity";

export class ProRetailpointsStatsNotifier {
  static provider = selector<ProStats[]>({
    key: "pro_retailpoints_stats",
    get: async ({ get }) => {
      let retailpointsIds = get(
        ProRetailpointsNotifier.retailpointListProvider
      );
      let range = get(StatsRangeNotifier.provider);
      return new GetProRetailpointsStats().call(
        retailpointsIds,
        range.begin,
        range.end
      );
    },
    //Todo: To change cache handle policy update
    cachePolicy_UNSTABLE: { eviction: "most-recent" },
  });

  static activeRetailPointsList = selector<any>({
    key: "pro_retailpoints_infos",
    get: async ({ get }) => {
      let provider = get(ProRetailpointsStatsNotifier.provider);

      return provider.filter(data => data.totalDeliveries > 0);
    },
    //Todo: To change cache handle policy update
    cachePolicy_UNSTABLE: { eviction: "most-recent" },
  });
}
