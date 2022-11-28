import { BlockedDeliverer } from "../../entity/pro_deliverer.entity";
import { ObservableStorage } from "./observable_storage";

export class BlockedDelivererStorage extends ObservableStorage<
  BlockedDeliverer[]
> {
  constructor() {
    super([]);
  }

  static instance = new BlockedDelivererStorage();
}
