import { Observable } from "rxjs";
import { FavoriteAddress } from "../entity/favorite_address";
import { MissionClient } from "../entity/mission.entity";
import { FavoriteAddressOwner } from "../provider/http/api";
export declare class FavoriteAddressRepository {
    private api;
    getFavoriteAddress(proId: string, rpId: string): Observable<FavoriteAddress[]>;
    createFavoriteAddress(client: MissionClient, owner: FavoriteAddressOwner, about: FavoriteAddressOwner): Promise<FavoriteAddress>;
}
