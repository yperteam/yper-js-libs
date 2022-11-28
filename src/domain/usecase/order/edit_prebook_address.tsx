import { GetCurrentProId } from "@yper-script/react/domain/usecase/get_current_pro_id";
import { OrderRepository } from "@yper-script/react/data/repository/order.repository";
import { Address } from "@yper-script/react/data/entity/address.entity";
import { firstValueFrom } from "rxjs";
import {
  MissionClient,
  MissionAddress,
} from "@yper-script/react/data/entity/mission.entity";

export class EditPrebookAddress {
  /** Repository */
  private orderRepository: OrderRepository = new OrderRepository();

  /** UseCase */
  private getCurrentProId = new GetCurrentProId();

  public async call({
    prebookId,
    sender,
    receiver,
    receiverAddress,
    senderAddress,
  }: {
    prebookId: string;
    sender: MissionClient;
    receiver: MissionClient;
    receiverAddress: MissionAddress;
    senderAddress?: MissionAddress;
  }): Promise<any> {
    return this.orderRepository.updatePrebook({
      proId: await firstValueFrom(this.getCurrentProId()),
      prebookId: prebookId,
      sender: sender,
      receiver: receiver,
      receiverAddress: receiverAddress,
      senderAddress: senderAddress,
    });
  }
}
