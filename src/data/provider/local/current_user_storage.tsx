import { User } from "../../../data/entity/user.entity";
import { ObservableStorage } from "./observable_storage";

export class CurrentUserStorage extends ObservableStorage<User> {
  constructor() {
    super(null);
  }

  static instance = new CurrentUserStorage();
}
