import { selector } from "recoil";
import { GetRetailpointStats } from "@yper-script/react/domain/usecase/get_retailpoint_stats";
import { ProRetailpointStats } from "@yper-script/react/data/entity/pro_retailpoint_stats.entity";
import { StatsRangeNotifier } from "@yper-script/react/app/notifiers/stats_range_notifier";

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
