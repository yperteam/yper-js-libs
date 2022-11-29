import { ObservableStorage } from "./observable_storage";
export declare class AuthStorage extends ObservableStorage<string> {
    constructor();
    static instance: AuthStorage;
}
