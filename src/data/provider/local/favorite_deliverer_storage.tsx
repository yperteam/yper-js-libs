import { ProFavoriteDeliverer } from "../../entity/pro_deliverer.entity";
import { ObservableStorage } from "./observable_storage";

export class FavoriteDelivererStorage extends ObservableStorage<
  ProFavoriteDeliverer[]
> {
  constructor() {
    super([]);
  }

  static instance = new FavoriteDelivererStorage();
}
