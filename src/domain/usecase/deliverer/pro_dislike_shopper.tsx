import { GetCurrentProId } from "../pro/get_current_pro_id";
import { ProRepository } from "../../../data/repository/pro.repository";
import { GetCurrentRetailpointId } from "../../../domain/usecase/retailpoint/get_current_retailpoint_id";
import { firstValueFrom } from "rxjs";

export class ProDislikeShopper {
  /** Repository */
  private proRepository: ProRepository = new ProRepository();

  /** UseCase */
  private getCurrentRetailPoint: GetCurrentRetailpointId = new GetCurrentRetailpointId();
  private getCurrentProId = new GetCurrentProId();

  public async call(likeId: string): Promise<any> {
    return this.proRepository.dislikeShopper(
      await firstValueFrom(this.getCurrentProId()),
      await firstValueFrom(this.getCurrentRetailPoint()),
      likeId
    );
  }
}