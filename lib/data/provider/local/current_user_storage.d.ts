import { ObservableStorage } from "./observable_storage";
export declare class CurrentUserStorage extends ObservableStorage<string> {
    constructor();
    static instance: CurrentUserStorage;
}
