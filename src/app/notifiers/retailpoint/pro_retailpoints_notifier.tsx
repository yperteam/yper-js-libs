import {
  atom,
  Loadable,
  RecoilLoadable,
  selector,
  selectorFamily,
} from "recoil";
import { GetProRetailpoints } from "../../../domain/usecase/get_pro_retailpoints";
import {
  ProRetailpointList,
  Retailpoint,
} from "../../../data/entity/retailpoint.entity";
import { StreamNotifier } from "../stream_notifier";

export class ProRetailpointsNotifier {
  static provider = StreamNotifier.provider({
    key: "pro_retailpoints",
    stream: new GetProRetailpoints()(),
  });

  static retailPointList = selector<string[]>({
    key: "pro_retailpoints_ids",
    get: ({ get }) => {
      let retailpoints = get(ProRetailpointsNotifier.provider);
      return retailpoints.contents?.data.map(r => r.id);
    },
    set: ({ set }, newValue) => {
      set(ProRetailpointsNotifier.retailpointListProvider, [newValue]);
    },
    //Todo: To change cache handle policy update
    cachePolicy_UNSTABLE: { eviction: "most-recent" },
  });

  static retailpointListProvider = atom<any>({
    key: "get_retailpoint-list_provider",
    default: ProRetailpointsNotifier.retailPointList,
  });

  static getRetailpointInfos = selectorFamily({
    key: "get_retailpoint_info",
    get: (id: string) => ({ get }) => {
      return get(ProRetailpointsNotifier.provider).map(rps => {
        return RecoilLoadable.of(
          rps.data.filter(retailpoint => retailpoint.id === id)[0]
        );
      });
    },
  });
}
