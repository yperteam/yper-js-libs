import { Mission } from "../../entity/mission.entity";
import { ObservableStorage } from "./observable_storage";
export declare class PrebookStorage extends ObservableStorage<Mission> {
    constructor();
    static instance: PrebookStorage;
}
