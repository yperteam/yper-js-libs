import { GetCurrentProId } from "@yper-script/react/domain/usecase/get_current_pro_id";
import { OrderRepository } from "@yper-script/react/data/repository/order.repository";
import { GetPrebook } from "@yper-script/react/domain/usecase/order/get_prebook";
import { firstValueFrom } from "rxjs";
import {
  ReturnPolicy,
  TransportType,
} from "@yper-script/react/data/entity/mission.entity";

export class EditPrebookDetails {
  /** Repository */
  private orderRepository: OrderRepository = new OrderRepository();

  /** UseCase */
  private getCurrentProId = new GetCurrentProId();

  public async call({
    prebookId,
    startDate,
    endDate,
    ceremonyDate,
    transportType,
    returnPolicy,
    orderName,
    comment,
  }: {
    prebookId: string;
    startDate: Date;
    endDate: Date;
    ceremonyDate: Date;
    transportType: TransportType;
    returnPolicy: ReturnPolicy;
    orderName: string;
    comment?: string;
  }): Promise<any> {
    return this.orderRepository.updatePrebook({
      proId: await firstValueFrom(this.getCurrentProId()),
      prebookId: prebookId,
      startDate: startDate,
      endDate: endDate,
      ceremonyDate: ceremonyDate,
      transportType: transportType,
      returnPolicy: returnPolicy,
      orderName: orderName,
      comment: comment,
    });
  }
}
