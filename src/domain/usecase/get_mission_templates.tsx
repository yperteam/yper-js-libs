import { GetCurrentProId } from "@yper-script/react/domain/usecase/get_current_pro_id";
import { ProRepository } from "@yper-script/react/data/repository/pro.repository";
import { GetCurrentRetailpointId } from "@yper-script/react/domain/usecase/get_current_retailpoint_id";
import { RetailpointRepository } from "@yper-script/react/data/repository/retailpoint.repository";
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
