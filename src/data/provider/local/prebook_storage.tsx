import { Mission } from "../../entity/mission.entity";
import { ObservableStorage } from "./observable_storage";

export class PrebookStorage extends ObservableStorage<Mission> {
  constructor() {
    super(null);
  }

  static instance = new PrebookStorage();
}
