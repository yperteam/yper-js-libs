import { Mission } from "@yper-script/react/data/entity/mission.entity";
import { OrderRepository } from "@yper-script/react/data/repository/order.repository";
import { GetCurrentProId } from "@yper-script/react/domain/usecase/get_current_pro_id";
import CallableInstance from "callable-instance";
import { Observable, switchMap } from "rxjs";
export class GetPrebook extends CallableInstance<
  [string],
  Observable<Mission>
> {
  /** Repository */
  private orderRepository: OrderRepository = new OrderRepository();

  /** UseCase */
  private getCurrentProId = new GetCurrentProId();

  constructor() {
    super("instanceMethod");
  }

  public instanceMethod(prebookId: string): Observable<Mission> {
    return this.getCurrentProId().pipe(
      switchMap(proId => this.orderRepository.getPrebook(proId, prebookId))
    );
  }
}
