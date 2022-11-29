import { firstValueFrom } from "rxjs";
import { GetCurrentProId } from "../../../domain/usecase/pro/get_current_pro_id";
import { ProRepository } from "../../../data/repository/pro.repository";
import { GetCurrentRetailpointId } from "../../../domain/usecase/retailpoint/get_current_retailpoint_id";

export class GetRetailpointCatchmentArea {
  /** Repository */
  private proRepository: ProRepository = new ProRepository();

  /** UseCase */
  private getCurrentProId: GetCurrentProId = new GetCurrentProId();
  private getCurrentRetailPoint: GetCurrentRetailpointId = new GetCurrentRetailpointId();

  public async call(
    begin: Date,
    end: Date,
    distanceInterval: number,
    min: number,
    max: number
  ) {
    return await this.proRepository.getRetailPointCatchmentsArea(
      await firstValueFrom(this.getCurrentProId()),
      await firstValueFrom(this.getCurrentRetailPoint()),
      begin,
      end,
      distanceInterval,
      min,
      max
    );
  }
}
