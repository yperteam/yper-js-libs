/**
 * Distinct order status
 */
export enum OrderStatus {
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
export enum OrderItemType {
    delivery = "delivery",
    invoice = "invoice",
    pro_subscription = "pro_subscription"
}
