import { FavoriteAddress } from "@yper-script/react/data/entity/favorite_address";
import { PaginatedResult } from "@yper-script/react/data/provider/http/paginated_result";
import { FavoriteAddressRepository } from "@yper-script/react/data/repository/favorite_address.repository";
import { combineLatest, Observable, switchMap } from "rxjs";
import { GetCurrentProId } from "../get_current_pro_id";
import { GetCurrentRetailpointId } from "../get_current_retailpoint_id";

export class GetFavoriteAddress {
  private repository: FavoriteAddressRepository = new FavoriteAddressRepository();
  private getCurrentProId: GetCurrentProId = new GetCurrentProId();
  private getCurrentRpId = new GetCurrentRetailpointId();

  public call(): Observable<FavoriteAddress[]> {
    return combineLatest([this.getCurrentProId(), this.getCurrentRpId()]).pipe(
      switchMap(([id, rpId]) => this.repository.getFavoriteAddress(id, rpId))
    );
  }
}
