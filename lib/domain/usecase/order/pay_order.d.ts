export declare class PayOrder {
    /** Repository */
    private orderRepository;
    call(orderId: string, paymentId?: string): Promise<void>;
}
