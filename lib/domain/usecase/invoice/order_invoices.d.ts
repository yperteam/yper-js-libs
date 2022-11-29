import { Order } from "../../../data/entity/order.entity";
export declare class OrderInvoices {
    private repository;
    private getCurrentProId;
    call(invoiceIds: string[]): Promise<Order>;
}
