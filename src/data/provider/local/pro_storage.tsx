import { ObservableStorage } from "./observable_storage";

export class ProStorage extends ObservableStorage<string> {
  constructor() {
    super(null);
  }

  static instance = new ProStorage();
}
