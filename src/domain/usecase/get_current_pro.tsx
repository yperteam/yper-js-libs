import { firstValueFrom } from "rxjs";
import { ProRepository } from "@yper-script/react/data/repository/pro.repository";
import { Pro } from "@yper-script/react/data/entity/pro.entity";

export class GetCurrentPro {
  /** Repository */
  private proRepository: ProRepository = new ProRepository();

  public async call(): Promise<Pro> {
    // TODO observable
    const proId = await firstValueFrom(this.proRepository.getCurrentProId());
    return this.proRepository.getPro(proId);
  }
}
