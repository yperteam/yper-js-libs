import { ProFavoriteDeliverer } from "../../entity/pro_deliverer.entity";
import { ObservableStorage } from "./observable_storage";
export declare class FavoriteDelivererStorage extends ObservableStorage<ProFavoriteDeliverer[]> {
    constructor();
    static instance: FavoriteDelivererStorage;
}
