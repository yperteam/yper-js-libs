import { from, mergeMap, Observable } from "rxjs";
import { FavoriteAddress } from "../entity/favorite_address";
import { MissionClient } from "../entity/mission.entity";
import { Api, FavoriteAddressOwner } from "../provider/http/api";
import { PaginatedResult } from "../provider/http/paginated_result";
import { FavoriteAddressStorage } from "../provider/local/favorite_address_storage";

export class FavoriteAddressRepository {
  private api = new Api();

  public getFavoriteAddress(
    proId: string,
    rpId: string
  ): Observable<FavoriteAddress[]> {
    return from(this.api.getProFavoriteAddress(proId, rpId, -1)).pipe(
      mergeMap(list => {
        FavoriteAddressStorage.instance.set(list.data);
        return FavoriteAddressStorage.instance.get();
      })
    );
  }

  public async createFavoriteAddress(
    client: MissionClient,
    owner: FavoriteAddressOwner,
    about: FavoriteAddressOwner
  ): Promise<FavoriteAddress> {
    const favorite = await this.api.createProFavoriteAddress(
      client,
      owner,
      about
    );
    FavoriteAddressStorage.instance.add(favorite);
    return favorite;
  }
}
