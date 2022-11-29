import { Society } from "../../../data/entity/society.entity";
import { ProRepository } from "../../../data/repository/pro.repository";
import { map, Observable, switchMap } from "rxjs";
import { GetCurrentProId } from "../pro/get_current_pro_id";

//TODO: Get society from SocietyRepository

export class GetSociety {
  private repository: ProRepository = new ProRepository();

  private getCurrentProId: GetCurrentProId = new GetCurrentProId();

  public call(): Observable<Society> {
    return this.getCurrentProId().pipe(
      switchMap(id => {
        return this.repository.getPro(id);
      }),
      map(pro => pro.companyInfos)
    );
  }
}
