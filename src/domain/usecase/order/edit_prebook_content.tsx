import { GetCurrentProId } from "@yper-script/react/domain/usecase/get_current_pro_id";
import { OrderRepository } from "@yper-script/react/data/repository/order.repository";
import { GetPrebook } from "@yper-script/react/domain/usecase/order/get_prebook";
import { firstValueFrom } from "rxjs";

export class EditPrebookContent {
  /** Repository */
  private orderRepository: OrderRepository = new OrderRepository();

  /** UseCase */
  private getCurrentProId = new GetCurrentProId();

  public async call({
    prebookId,
    options,
    product,
    price,
    itemsNb,
  }: {
    prebookId: string;
    options: string[];
    product: string;
    price: number;
    itemsNb: number;
  }): Promise<any> {
    return this.orderRepository.updatePrebook({
      proId: await firstValueFrom(this.getCurrentProId()),
      prebookId: prebookId,
      options: options,
      product: product,
      price: price,
      itemsNb: itemsNb,
    });
  }
}
