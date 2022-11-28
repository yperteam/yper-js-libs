import { firstValueFrom } from "rxjs";
import { GetCurrentProId } from "@yper-script/react/domain/usecase/get_current_pro_id";
import { ProRepository } from "@yper-script/react/data/repository/pro.repository";
import { ProStats } from "@yper-script/react/data/entity/pro_retailpoint_stats.entity";

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
