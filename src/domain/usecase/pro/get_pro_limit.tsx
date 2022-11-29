import { GetCurrentProId } from "./get_current_pro_id";
import { ProRepository } from "../../../data/repository/pro.repository";
import { ProLimit } from "../../../data/entity/pro_limit.entity";
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
