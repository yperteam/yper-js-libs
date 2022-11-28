import { firstValueFrom } from "rxjs";
import { GetCurrentProId } from "@yper-script/react/domain/usecase/get_current_pro_id";
import { ProRepository } from "@yper-script/react/data/repository/pro.repository";
import { GetCurrentRetailpointId } from "@yper-script/react/domain/usecase/get_current_retailpoint_id";
import { StatsInterval } from "@yper-script/react/data/entity/stats_interval.enum";
import DatedStatNumber from "../model/dated_stat_number";

export class GetRetailpointCartPrice {
  /** Repository */
  private proRepository: ProRepository = new ProRepository();

  /** UseCase */
  private getCurrentProId: GetCurrentProId = new GetCurrentProId();
  private getCurrentRetailPoint: GetCurrentRetailpointId = new GetCurrentRetailpointId();

  public async call(
    begin: Date,
    end: Date,
    interval: StatsInterval
  ): Promise<DatedStatNumber[]> {
    return this.proRepository.getRetailPointCartPrice(
      await firstValueFrom(this.getCurrentProId()),
      await firstValueFrom(this.getCurrentRetailPoint()),
      begin,
      end,
      interval
    );
  }
}
