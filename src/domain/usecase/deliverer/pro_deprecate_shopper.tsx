import { GetCurrentProId } from "@yper-script/react/domain/usecase/get_current_pro_id";
import { ProRepository } from "@yper-script/react/data/repository/pro.repository";
import { BlockedDeliverer } from "@yper-script/react/data/entity/pro_deliverer.entity";
import { firstValueFrom } from "rxjs";

export class ProDeprecateShopper {
  /** Repository */
  private proRepository: ProRepository = new ProRepository();

  /** UseCase */
  private getCurrentProId = new GetCurrentProId();

  public async call(delivererId: string): Promise<BlockedDeliverer> {
    return this.proRepository.deprecateShopper(
      await firstValueFrom(this.getCurrentProId()),
      delivererId
    );
  }
}
