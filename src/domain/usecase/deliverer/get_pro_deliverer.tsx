import { GetCurrentProId } from "../pro/get_current_pro_id";
import { ProRepository } from "../../../data/repository/pro.repository";
import { ProDeliverer } from "../../../data/entity/pro_deliverer.entity";
import { firstValueFrom } from "rxjs";

export class GetProDeliverer {
  /** Repository */
  private proRepository: ProRepository = new ProRepository();

  /** UseCase */
  private getCurrentProId = new GetCurrentProId();

  public async call(filter: string): Promise<ProDeliverer[]> {
    return this.proRepository.getDeliverer(
      await firstValueFrom(this.getCurrentProId()),
      filter
    );
  }
}
