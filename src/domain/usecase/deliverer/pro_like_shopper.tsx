import { GetCurrentProId } from "@yper-script/react/domain/usecase/get_current_pro_id";
import { ProRepository } from "@yper-script/react/data/repository/pro.repository";
import { GetCurrentRetailpointId } from "@yper-script/react/domain/usecase/get_current_retailpoint_id";
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
