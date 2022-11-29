import { ProRepository } from "../../../data/repository/pro.repository";
import { BlockedDeliverer } from "../../../data/entity/pro_deliverer.entity";
import { Observable, switchMap } from "rxjs";
import { GetCurrentProId } from "../pro/get_current_pro_id";
import CallableInstance from "callable-instance";

export class GetProBlockedDeliverers extends CallableInstance<
  [],
  Observable<BlockedDeliverer[]>
> {
  /** Repository */
  private proRepository: ProRepository = new ProRepository();

  /** UseCase */
  private getCurrentProId: GetCurrentProId = new GetCurrentProId();

  constructor() {
    super("instanceMethod");
  }

  public instanceMethod(): Observable<BlockedDeliverer[]> {
    return this.getCurrentProId().pipe(
      switchMap(id => this.proRepository.getBlockedDeliverers(id))
    );
  }
}
