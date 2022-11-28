import { OrderRepository } from "@yper-script/react/data/repository/order.repository";
import { Order } from "@yper-script/react/data/entity/order.entity";

export class GetOrder {
  /** Repository */
  private orderRepository: OrderRepository = new OrderRepository();

  public async call(orderId): Promise<Order> {
    return this.orderRepository.getOrder(orderId);
  }
}
