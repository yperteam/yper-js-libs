import { GetCurrentProId } from "../../../domain/usecase/pro/get_current_pro_id";
import { ProRepository } from "../../../data/repository/pro.repository";
import { GetCurrentRetailpointId } from "../../../domain/usecase/retailpoint/get_current_retailpoint_id";
import { firstValueFrom } from "rxjs";

export class GetRetailpointStats {
  /** Repository */
  private proRepository: ProRepository = new ProRepository();

  /** UseCase */
  private getCurrentProId: GetCurrentProId = new GetCurrentProId();
  private getCurrentRetailPoint: GetCurrentRetailpointId = new GetCurrentRetailpointId();

  // todo change
  public async call(begin: Date, end: Date) {
    return this.proRepository.getRetailPointStats(
      await firstValueFrom(this.getCurrentProId()),
      await firstValueFrom(this.getCurrentRetailPoint()),
      begin,
      end
    );
  }
}
