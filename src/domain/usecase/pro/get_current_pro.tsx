import { firstValueFrom } from "rxjs";
import { ProRepository } from "../../../data/repository/pro.repository";
import { Pro } from "../../../data/entity/pro.entity";

export class GetCurrentPro {
  /** Repository */
  private proRepository: ProRepository = new ProRepository();

  public async call(): Promise<Pro> {
    // TODO observable
    const proId = await firstValueFrom(this.proRepository.getCurrentProId());
    return this.proRepository.getPro(proId);
  }
}
