import { GetCurrentProId } from "@yper-script/react/domain/usecase/get_current_pro_id";
import { ProRepository } from "@yper-script/react/data/repository/pro.repository";
import { firstValueFrom } from "rxjs";

export class ResetProSecret {
  private proRepository: ProRepository = new ProRepository();
  private getCurrentProId: GetCurrentProId = new GetCurrentProId();

  public async call() {
    return this.proRepository.resetSecret(
      await firstValueFrom(this.getCurrentProId())
    );
  }
}
