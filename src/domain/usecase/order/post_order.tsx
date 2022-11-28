import { GetCurrentProId } from "@yper-script/react/domain/usecase/get_current_pro_id";
import { OrderRepository } from "@yper-script/react/data/repository/order.repository";
import { firstValueFrom } from "rxjs";

export class PostOrder {
  /** Repository */
  private orderRepository: OrderRepository = new OrderRepository();

  /** UseCase */
  private getCurrentProId = new GetCurrentProId();

  public async call(): Promise<any> {
    return this.orderRepository.createOrder(
      await firstValueFrom(this.getCurrentProId())
    );
  }
}
