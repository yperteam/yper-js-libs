import { selector } from "recoil";
import { GetRetailpointCatchmentArea } from "../../../domain/usecase/retailpoint/get_retailpoint_catchment_area";
import { StatsRangeNotifier } from "../../../app/notifiers/stats_range_notifier";

export enum CatchmentAreasDefaultValues {
  distance_interval = 5000,
  min = 0,
  max = 15000,
}

export class ProRetailpointStatCatchmentAreasNotifier {
  static provider = selector<number[]>({
    key: "current-proRetailPointStatsCatchmentArea",
    get: async ({ get }) => {
      let range = get(StatsRangeNotifier.provider);
      let proRetailPointStatsCatchmentArea = await new GetRetailpointCatchmentArea().call(
        range.begin,
        range.end,
        CatchmentAreasDefaultValues.distance_interval,
        CatchmentAreasDefaultValues.min,
        CatchmentAreasDefaultValues.max
      );
      return proRetailPointStatsCatchmentArea;
    },
    //Todo: To change cache handle policy update
    cachePolicy_UNSTABLE: { eviction: "most-recent" },
  });
}
