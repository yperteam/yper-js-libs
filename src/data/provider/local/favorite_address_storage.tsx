import { FavoriteAddress } from "../../entity/favorite_address";
import { ObservableStorage } from "./observable_storage";

export class FavoriteAddressStorage extends ObservableStorage<
  FavoriteAddress[]
> {
  public add(item: FavoriteAddress) {
    this.subject.next([
      ...this.subject.value.filter(m => m.id != item.id),
      item,
    ]);
  }

  constructor() {
    super([]);
  }

  public byId(id: string): FavoriteAddress | undefined {
    return this.subject.value.find(m => m.id === id);
  }

  public remove(id: string) {
    this.subject.next(this.subject.value.filter(m => m.id != id));
  }

  static instance = new FavoriteAddressStorage();
}
