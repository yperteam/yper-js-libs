import { FavoriteAddress } from "../../../data/entity/favorite_address";
import { Observable } from "rxjs";
export declare class GetFavoriteAddress {
    private repository;
    private getCurrentProId;
    private getCurrentRpId;
    call(): Observable<FavoriteAddress[]>;
}
