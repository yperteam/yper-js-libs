import { ObservableStorage } from "./observable_storage";

export class CurrentRetailPointStorage extends ObservableStorage<string> {
  constructor() {
    super(null);
  }

  static instance = new CurrentRetailPointStorage();
}
