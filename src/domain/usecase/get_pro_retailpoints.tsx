import { switchMap, from, Observable } from "rxjs";
import { GetCurrentProId } from "@yper-script/react/domain/usecase/get_current_pro_id";
import { ProRepository } from "@yper-script/react/data/repository/pro.repository";
import { ProRetailpointList } from "@yper-script/react/data/entity/retailpoint.entity";
import CallableInstance from "callable-instance";

export class GetProRetailpoints extends CallableInstance<
  [],
  Observable<ProRetailpointList>
> {
  /** Repository */
  private proRepository: ProRepository = new ProRepository();

  /** UseCase */
  private getCurrentProId: GetCurrentProId = new GetCurrentProId();

  constructor() {
    super("instanceMethod");
  }

  public instanceMethod(): Observable<ProRetailpointList> {
    return this.getCurrentProId().pipe(
      switchMap(id => from(this.proRepository.getProRetailpoints(id)))
    );
  }
}
