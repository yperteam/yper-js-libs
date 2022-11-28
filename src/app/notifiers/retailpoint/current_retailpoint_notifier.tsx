import { GetCurrentRetailpointId } from "@yper-script/react/domain/usecase/get_current_retailpoint_id";
import { StreamNotifier } from "../stream_notifier";
import { Loadable, RecoilLoadable, selector } from "recoil";
import { ProRetailpointsNotifier } from "./pro_retailpoints_notifier";
import { Retailpoint } from "@yper-script/react/data/entity/retailpoint.entity";

export class CurrentRetailpointNotifier {
  static idProvider = StreamNotifier.provider({
    key: "current-retailpoint-id",
    stream: new GetCurrentRetailpointId()(),
  });

  static provider = selector<Retailpoint>({
    key: "current-retailpoint",
    get: ({ get }) => {
      let id = get(CurrentRetailpointNotifier.idProvider).valueMaybe();
      return get(ProRetailpointsNotifier.getRetailpointInfos(id));
    },
  });
}
