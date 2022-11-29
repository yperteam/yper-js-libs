import { FavoriteAddress } from "../../../data/entity/favorite_address";
import { MissionClient } from "../../../data/entity/mission.entity";
export declare class AddFavoriteAddress {
    private repository;
    private getCurrentRpId;
    private getCurrentProId;
    call(client: MissionClient): Promise<FavoriteAddress>;
}
