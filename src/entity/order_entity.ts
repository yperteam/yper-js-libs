import {OrderStatusEnum} from "../enums/order_enum";

export interface OrderEntity {
    amount_received: number,
    items: any[],
    left_to_pay: number,
    mission_ids: string[],
    payment_intents: [],
    price: {
        discount: number,
        price_ht: number,
        total_ht: number,
        tva: number
    }
    status: OrderStatusEnum,
    _id: string
}
