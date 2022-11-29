import { OrderItem } from "../entity/order_item";
import { Order } from "../entity/order.entity";
import { Observable } from "rxjs";
import { Mission, MissionAddress, MissionClient, ReturnPolicy, TransportType } from "../entity/mission.entity";
export declare class OrderRepository {
    private api;
    createOrder(proId: string): Promise<any>;
    getOrder(orderId: string): Promise<Order>;
    create(proId: string, items: OrderItem[]): Promise<Order>;
    validate(id: string): Promise<Order>;
    updatePrebook({ proId, prebookId, receiver, sender, receiverAddress, senderAddress, options, product, itemsNb, price, returnPolicy, transportType, startDate, endDate, ceremonyDate, orderName, comment, }: {
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
    }): Promise<Mission>;
    getPrebook(proId: string, prebookId: string): Observable<Mission>;
    validateOrder(orderId: string): Promise<Order>;
    payOrder(orderId: string, methodId?: string): Promise<Order>;
}
