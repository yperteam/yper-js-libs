import { GetCurrentProId } from "../pro/get_current_pro_id";
import { ProRepository } from "../../../data/repository/pro.repository";
import { GetCurrentRetailpointId } from "../../../domain/usecase/retailpoint/get_current_retailpoint_id";
import { firstValueFrom } from "rxjs";

export class ProLikeShopper {
  /** Repository */
  private proRepository: ProRepository = new ProRepository();

  /** UseCase */
  private getCurrentProId = new GetCurrentProId();
  private getCurrentRetailPoint: GetCurrentRetailpointId = new GetCurrentRetailpointId();

  public async call(delivererId: string, delivererType: string): Promise<any> {
    let res = await this.proRepository.likeShopper(
      await firstValueFrom(this.getCurrentProId()),
      await firstValueFrom(this.getCurrentRetailPoint()),
      delivererId,
      delivererType
    );

    return res;
  }
}
