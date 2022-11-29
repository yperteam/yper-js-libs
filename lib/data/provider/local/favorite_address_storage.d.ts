import { FavoriteAddress } from "../../entity/favorite_address";
import { ObservableStorage } from "./observable_storage";
export declare class FavoriteAddressStorage extends ObservableStorage<FavoriteAddress[]> {
    add(item: FavoriteAddress): void;
    constructor();
    byId(id: string): FavoriteAddress | undefined;
    remove(id: string): void;
    static instance: FavoriteAddressStorage;
}
