import { Retailpoint } from "../../entity/retailpoint.entity";
import { ObservableStorage } from "./observable_storage";

export class RetailPointStorage extends ObservableStorage<Retailpoint[]> {
  constructor() {
    super(null);
  }

  static instance = new RetailPointStorage();
}
