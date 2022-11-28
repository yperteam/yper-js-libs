import { ObservableStorage } from "./observable_storage";

export class CurrentUserStorage extends ObservableStorage<string> {
  constructor() {
    super(null);
  }

  static instance = new CurrentUserStorage();
}
