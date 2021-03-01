/**
 * Distinct order status
 */
export enum OrderStatusEnum {
    created = "created",
    levy = "levy",
    pending = "pending",
    processing = "processing",
    processed = "processed",
    canceled = "canceled",
    end = "end",
}

/**
 * Order item types
 */
export enum OrderItemTypeEnum {
    delivery = "delivery",
    invoice = "invoice",
    pro_subscription = "pro_subscription"
}
