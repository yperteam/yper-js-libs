import { GetCurrentProId } from "../../../domain/usecase/pro/get_current_pro_id";
import { OrderRepository } from "../../../data/repository/order.repository";
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
