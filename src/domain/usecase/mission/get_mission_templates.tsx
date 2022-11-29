import { GetCurrentProId } from "../../../domain/usecase/pro/get_current_pro_id";
import { ProRepository } from "../../../data/repository/pro.repository";
import { GetCurrentRetailpointId } from "../../../domain/usecase/retailpoint/get_current_retailpoint_id";
import { RetailpointRepository } from "../../../data/repository/retailpoint.repository";
import { firstValueFrom } from "rxjs";

export class GetMissionTemplates {
  /** Repository */
  private proRepository: ProRepository = new ProRepository();
  private retailpointRepository: RetailpointRepository = new RetailpointRepository();

  /** UseCase */
  private getCurrentProId: GetCurrentProId = new GetCurrentProId();
  private getCurrentRetailPoint: GetCurrentRetailpointId = new GetCurrentRetailpointId();

  // todo change
  public async call() {
    const proId = await firstValueFrom(this.getCurrentProId());
    if (this.getCurrentRetailPoint) {
      return this.retailpointRepository.getMissionTemplates(
        proId,
        await firstValueFrom(this.getCurrentRetailPoint())
      );
    }

    return this.proRepository.getMissionTemplates(proId);
  }
}
