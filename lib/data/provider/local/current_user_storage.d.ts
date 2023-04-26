import { User } from "../../../data/entity/user.entity";
import { ObservableStorage } from "./observable_storage";
export declare class CurrentUserStorage extends ObservableStorage<User> {
    constructor();
    static instance: CurrentUserStorage;
}
