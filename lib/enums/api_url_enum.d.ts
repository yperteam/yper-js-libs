export declare class AbstractApiUrlEnum {
    static root: string;
}
/**
 * Admin Delivery
 */
export declare class ApiAdminDeliveryUrlEnum {
    static root_admin_delivery: string;
    static e_root_admin_delivery: string;
    static root_admin_mission_parcel: string;
    static e_root_admin_mission_parcel: string;
    static endpoint_post_delivery_failure: string;
}
/**
 * Delivery
 */
export declare class ApiDeliveryUrlEnum {
    static root_delivery: string;
    static e_root_delivery: string;
    static patch_delivery: string;
    static shift_delivery: string;
    static delivery_timeslot: string;
    static transfer_journey: string;
    static root_delivery_parcel: string;
    static endpoint_post_parcel_refuse: string;
    static endpoint_post_pending_hub_customer_handover: string;
}
/**
 * Parcel
 */
export declare class ApiParcelUrlEnum {
    static root_parcel: string;
    static e_root_parcel: string;
    static endpoint_post_parcel_refuse: string;
}
/**
 * RetailPoint
 */
export declare class ApiRetailPointUrlEnum {
    static root_retail_point: string;
    static e_root_retail_point: string;
    static get_retail_point_search: string;
}
/**
 * Order
 */
export declare class ApiOrderUrlEnum {
    static root_order: string;
    static e_root_order: string;
    static e_root_order_add_items: string;
    static e_root_order_pay: string;
    static e_root_order_validate: string;
}
/**
 * User
 */
export declare class ApiUserUrlEnum {
    static root_user: string;
    static e_root_user: string;
    static e_root_user_confirm_subscription: string;
}
/**
 * UserPaymentMethod
 */
export declare class ApiUserPaymentMethodUrlEnum {
    static root_user_payment_method: string;
    static e_root_user_payment_method: string;
    static user_payment_method_primary: string;
}
/**
 * PaymentIntent
 */
export declare class ApiPaymentIntentUrlEnum {
    static root_payment_intent: string;
    static e_root_payment_intent: string;
}
