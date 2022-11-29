import { FavoriteAddress } from "../../../data/entity/favorite_address";
import { FavoriteAddressRepository } from "../../../data/repository/favorite_address.repository";
import { combineLatest, Observable, switchMap } from "rxjs";
import { GetCurrentProId } from "../pro/get_current_pro_id";
import { GetCurrentRetailpointId } from "../retailpoint/get_current_retailpoint_id";

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
