import { switchMap, from, Observable } from "rxjs";
import { GetCurrentProId } from "../../../domain/usecase/pro/get_current_pro_id";
import { ProRepository } from "../../../data/repository/pro.repository";
import { ProRetailpointList } from "../../../data/entity/retailpoint.entity";
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
