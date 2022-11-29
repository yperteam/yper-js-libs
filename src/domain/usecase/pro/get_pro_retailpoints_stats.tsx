import { firstValueFrom } from "rxjs";
import { GetCurrentProId } from "../../../domain/usecase/pro/get_current_pro_id";
import { ProRepository } from "../../../data/repository/pro.repository";
import { ProStats } from "../../../data/entity/pro_retailpoint_stats.entity";

export class GetProRetailpointsStats {
  /** Repository */
  private proRepository: ProRepository = new ProRepository();

  /** UseCase */
  private getCurrentProId: GetCurrentProId = new GetCurrentProId();

  public async call(
    retailpointIds: string[],
    begin: Date,
    end: Date
  ): Promise<ProStats[]> {
    return this.proRepository.getProRetailpoinsStats(
      await firstValueFrom(this.getCurrentProId()),
      retailpointIds,
      begin,
      end
    );
  }
}
