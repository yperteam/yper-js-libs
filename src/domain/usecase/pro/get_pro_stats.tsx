import { firstValueFrom } from "rxjs";
import { GetCurrentProId } from "../../../domain/usecase/pro/get_current_pro_id";
import { ProRepository } from "../../../data/repository/pro.repository";
import { ProRetailpointStats } from "src/data/entity/pro_retailpoint_stats.entity";

export class GetProStats {
  /** Repository */
  private proRepository: ProRepository = new ProRepository();

  /** UseCase */
  private getCurrentProId: GetCurrentProId = new GetCurrentProId();

  public async call(begin: Date, end: Date, retailpointsIds: string[]): Promise<ProRetailpointStats> {
    return this.proRepository.getProStats(
      await firstValueFrom(this.getCurrentProId()),
      begin,
      end,
      retailpointsIds
    );
  }
}
