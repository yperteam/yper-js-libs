import { firstValueFrom } from "rxjs";
import { GetCurrentProId } from "../../../domain/usecase/pro/get_current_pro_id";
import { ProRepository } from "../../../data/repository/pro.repository";
import { GetCurrentRetailpointId } from "../../../domain/usecase/retailpoint/get_current_retailpoint_id";
import { StatsInterval } from "../../../data/entity/stats_interval.enum";
import DatedStatNumber from "../../model/dated_stat_number";

export class GetRetailpointDeliveriesDistribution {
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
    return await this.proRepository.getRetailPointDeliveryDistribution(
      await firstValueFrom(this.getCurrentProId()),
      await firstValueFrom(this.getCurrentRetailPoint()),
      begin,
      end,
      interval
    );
  }
}
