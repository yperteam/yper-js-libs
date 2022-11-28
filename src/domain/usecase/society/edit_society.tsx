import { Society } from "@yper-script/react/data/entity/society.entity";
import { ProRepository } from "@yper-script/react/data/repository/pro.repository";
import {
  SocietyRepository,
  SocietyRequestParams,
} from "@yper-script/react/data/repository/society.repository";
import { firstValueFrom } from "rxjs";

export class EditSociety {
  private proRepository: ProRepository = new ProRepository();
  private societyRepository: SocietyRepository = new SocietyRepository();

  public async call(society: SocietyRequestParams): Promise<Society> {
    const proId = await firstValueFrom(this.proRepository.getCurrentProId());
    return this.societyRepository.editSociety(proId, society);
  }
}
