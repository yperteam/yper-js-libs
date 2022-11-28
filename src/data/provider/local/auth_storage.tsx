import { ObservableStorage } from "./observable_storage";

export class AuthStorage extends ObservableStorage<string> {
  constructor() {
    super(null);
  }

  static instance = new AuthStorage();
}
