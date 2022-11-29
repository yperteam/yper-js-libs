import { Order } from "../../../data/entity/order.entity";
export declare class GetOrder {
    /** Repository */
    private orderRepository;
    call(orderId: string): Promise<Order>;
}
