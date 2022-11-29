import { Society } from "../../../data/entity/society.entity";
import { ProRepository } from "../../../data/repository/pro.repository";
import {
  SocietyRepository,
  SocietyRequestParams,
} from "../../../data/repository/society.repository";
import { firstValueFrom } from "rxjs";

export class EditSociety {
  private proRepository: ProRepository = new ProRepository();
  private societyRepository: SocietyRepository = new SocietyRepository();

  public async call(society: SocietyRequestParams): Promise<Society> {
    const proId = await firstValueFrom(this.proRepository.getCurrentProId());
    return this.societyRepository.editSociety(proId, society);
  }
}
