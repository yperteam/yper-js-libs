import { OrderRepository } from "../../../data/repository/order.repository";
import { Order } from "../../../data/entity/order.entity";

export class GetOrder {
  /** Repository */
  private orderRepository: OrderRepository = new OrderRepository();

  public async call(orderId: string): Promise<Order> {
    return this.orderRepository.getOrder(orderId);
  }
}
