import { GetCurrentProId } from "@yper-script/react/domain/usecase/get_current_pro_id";
import { ProRepository } from "@yper-script/react/data/repository/pro.repository";
import { firstValueFrom } from "rxjs";

export class GetProLimit {
  /** Repository */
  private proRepository: ProRepository = new ProRepository();

  /** UseCase */
  private getCurrentProId: GetCurrentProId = new GetCurrentProId();

  public async call(): Promise<ProLimit> {
    return this.proRepository.getProLimit(
      await firstValueFrom(this.getCurrentProId())
    );
  }
}
