import { ProRepository } from "../../../data/repository/pro.repository";
import { GetCurrentRetailpointId } from "../../../domain/usecase/retailpoint/get_current_retailpoint_id";
import { ProFavoriteDeliverer } from "../../../data/entity/pro_deliverer.entity";
import { GetCurrentProId } from "../pro/get_current_pro_id";
import { switchMap, Observable, combineLatest } from "rxjs";
import CallableInstance from "callable-instance";

export class GetProFavoriteDeliverers extends CallableInstance<
  [],
  Observable<ProFavoriteDeliverer[]>
> {
  /** Repository */
  private proRepository: ProRepository = new ProRepository();

  /** UseCase */
  private getCurrentRetailPoint: GetCurrentRetailpointId = new GetCurrentRetailpointId();
  private getCurrentProId: GetCurrentProId = new GetCurrentProId();

  constructor() {
    super("instanceMethod");
  }

  public instanceMethod(): Observable<ProFavoriteDeliverer[]> {
    return combineLatest([
      this.getCurrentProId(),
      this.getCurrentRetailPoint(),
    ]).pipe(
      switchMap(([id, rpId]) =>
        this.proRepository.getFavoriteDeliverers(id, rpId)
      )
    );
  }
}
