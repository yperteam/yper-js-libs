import { OrderRepository } from "../../../data/repository/order.repository";
import { Order } from "../../../data/entity/order.entity";
import { firstValueFrom } from "rxjs";
import { GetCurrentProId } from "../pro/get_current_pro_id";

export class OrderInvoices {
  private repository: OrderRepository = new OrderRepository();
  private getCurrentProId: GetCurrentProId = new GetCurrentProId();

  public async call(invoiceIds: string[]): Promise<Order> {
    const order = await this.repository.create(
      await firstValueFrom(this.getCurrentProId()),
      invoiceIds.map(id => ({ type: "invoice", id: id }))
    );
    await this.repository.validate(order.id);
    return order;
  }
}
