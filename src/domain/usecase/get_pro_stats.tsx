import { firstValueFrom } from "rxjs";
import { GetCurrentProId } from "@yper-script/react/domain/usecase/get_current_pro_id";
import { ProRepository } from "@yper-script/react/data/repository/pro.repository";

export class GetProStats {
  /** Repository */
  private proRepository: ProRepository = new ProRepository();

  /** UseCase */
  private getCurrentProId: GetCurrentProId = new GetCurrentProId();

  public async call(begin: Date, end: Date, retailpointsIds: string[]) {
    return this.proRepository.getProStats(
      await firstValueFrom(this.getCurrentProId()),
      begin,
      end,
      retailpointsIds
    );
  }
}
