import { FavoriteAddress } from "@yper-script/react/data/entity/favorite_address";
import { MissionClient } from "@yper-script/react/data/entity/mission.entity";
import { FavoriteAddressRepository } from "@yper-script/react/data/repository/favorite_address.repository";
import { firstValueFrom } from "rxjs";
import { GetCurrentProId } from "../get_current_pro_id";
import { GetCurrentRetailpointId } from "../get_current_retailpoint_id";

export class AddFavoriteAddress {
  private repository = new FavoriteAddressRepository();
  private getCurrentRpId = new GetCurrentRetailpointId();
  private getCurrentProId = new GetCurrentProId();

  // TODO dirty but whatever
  public async call(client: MissionClient): Promise<FavoriteAddress> {
    const rpId = await firstValueFrom(this.getCurrentRpId());
    const proId = await firstValueFrom(this.getCurrentProId());

    return this.repository.createFavoriteAddress(
      client,
      {
        id: proId,
        type: "pro",
      },
      {
        id: rpId,
        type: "retail_point",
      }
    );
  }
}
