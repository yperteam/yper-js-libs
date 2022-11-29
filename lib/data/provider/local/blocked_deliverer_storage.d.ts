import { BlockedDeliverer } from "../../entity/pro_deliverer.entity";
import { ObservableStorage } from "./observable_storage";
export declare class BlockedDelivererStorage extends ObservableStorage<BlockedDeliverer[]> {
    constructor();
    static instance: BlockedDelivererStorage;
}
