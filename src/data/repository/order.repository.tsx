import { Api } from "@yper-script/react/data/provider/http/api";
import { OrderItem } from "@yper-script/react/data/entity/order_item";
import { Order } from "@yper-script/react/data/entity/order.entity";
import { Address } from "@yper-script/react/data/entity/address.entity";
import { firstValueFrom, from, Observable, switchMap } from "rxjs";
import { PrebookStorage } from "../provider/local/prebook_storage";
import {
  Mission,
  MissionAddress,
  MissionClient,
  ReturnPolicy,
  TransportType,
} from "../entity/mission.entity";

export class OrderRepository {
  private api = new Api();

  public async createOrder(proId: string): Promise<any> {
    return await this.api.createOrder(proId);
  }

  public async getOrder(orderId): Promise<Order> {
    return await this.api.getOrder(orderId);
  }

  public create(proId: string, items: OrderItem[]): Promise<Order> {
    return this.api.createOrder(proId, items);
  }

  public validate(id: string): Promise<Order> {
    return this.api.validateOrder(id);
  }

  public async updatePrebook({
    proId,
    prebookId,
    receiver,
    sender,
    receiverAddress,
    senderAddress,
    options,
    product,
    itemsNb,
    price,
    returnPolicy,
    transportType,
    startDate,
    endDate,
    ceremonyDate,
    orderName,
    comment,
  }: {
    proId: string;
    prebookId: string;
    receiver?: MissionClient;
    sender?: MissionClient;
    receiverAddress?: MissionAddress;
    senderAddress?: MissionAddress;
    options?: string[];
    product?: string;
    price?: number;
    itemsNb?: number;
    returnPolicy?: ReturnPolicy;
    transportType?: TransportType;
    startDate?: Date;
    endDate?: Date;
    ceremonyDate?: Date;
    orderName?: string;
    comment?: string;
  }): Promise<Mission> {
    const prebook = {
      ...(await firstValueFrom(PrebookStorage.instance.get())),
    };
    prebook.receiver = { ...(receiver ?? prebook.receiver) };
    prebook.sender = { ...(sender ?? prebook.sender) };
    prebook.sender.address = senderAddress ?? prebook.sender.address;
    prebook.receiver.address = receiverAddress ?? prebook.receiver.address;
    prebook.options = options ?? prebook.options;
    prebook.missionTemplate = {
      id: product ?? prebook.missionTemplate?.id,
      name: "",
    };
    prebook.extra = {
      nbItems: itemsNb ?? prebook.extra?.nbItems,
      price: price ?? prebook.extra?.price,
      isCeremony: prebook.extra.isCeremony,
      ceremonyDate: ceremonyDate ?? prebook.extra.ceremonyDate,
    };
    prebook.order = {
      id: orderName ?? prebook.order?.id,
      idFull: prebook.order?.idFull,
    };
    prebook.date = {
      deliveryStart: startDate ?? prebook.date?.deliveryStart,
      deliveryEnd: endDate ?? prebook.date?.deliveryEnd,
    };
    prebook.returnPolicy = returnPolicy ?? prebook.returnPolicy;
    prebook.transportType = transportType ?? prebook.transportType;
    prebook.comment = comment ?? prebook.comment;
    const changes = await this.api.updatePrebook(
      proId,
      prebookId,
      prebook.orderId,
      prebook.order.id,
      prebook.receiver,
      prebook.sender,
      prebook.receiver.address,
      prebook.sender.address,
      prebook.options,
      prebook.missionTemplate?.id,
      prebook.extra.price,
      prebook.extra.nbItems,
      prebook.transportType,
      prebook.returnPolicy,
      prebook.date.deliveryStart,
      prebook.date.deliveryEnd,
      prebook.extra.ceremonyDate,
      prebook.comment
    );
    prebook.price = changes.price;
    prebook.distance = changes.distance;
    const { geojsonDirections } = await this.api.getPrebook(proId, prebookId);
    prebook.geojsonDirections = geojsonDirections;
    PrebookStorage.instance.set(prebook);
    return prebook;
  }

  public getPrebook(proId: string, prebookId: string): Observable<Mission> {
    return from(this.api.getPrebook(proId, prebookId)).pipe(
      switchMap(prebook => {
        PrebookStorage.instance.set(prebook);
        return PrebookStorage.instance.get();
      })
    );
  }

  public async validateOrder(orderId: string) {
    return this.api.validateOrder(orderId);
  }

  public async payOrder(orderId: string, methodId?: string) {
    return this.api.payOrder(orderId, methodId);
  }
}
