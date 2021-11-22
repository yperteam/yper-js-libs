export declare class AbstractApiUrlEnum {
    static root: string;
}
/**
 * Admin
 */
export declare class ApiAdminEnum {
    static root_admin: string;
    static send_admin_message: string;
    static endpoint_user_reactivate: string;
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
    static delete_shopper: string;
    static delivery_timeslot: string;
    static transfer_journey: string;
    static neighbour_deposit: string;
    static get_events: string;
    static root_delivery_parcel: string;
    static endpoint_post_parcel_refuse: string;
    static endpoint_post_pending_hub_customer_handover: string;
    static endpoint_post_defray_shopper: string;
}
/**
 * DMP
 */
export declare class ApiDmpUrlEnum {
    static availability_color: string;
}
/**
 * Voucher
 */
export declare class ApiVoucherUrlEnum {
    static root_voucher: string;
    static e_root_voucher: string;
    static root_sponsorship: string;
    static e_root_sponsorship: string;
    static root_admin_sponsorship: string;
    static e_root_admin_sponsorship: string;
    static endpoint_post_deactivate: string;
    static endpoint_validate_sponsorship: string;
    static endpoint_refuse_sponsorship: string;
}
/**
 * Document
 */
export declare class ApiDocumentUrlEnum {
    static root_document: string;
    static e_root_document: string;
}
/**
 * Hub
 */
export declare class ApiHubUrlEnum {
    static root_hub: string;
    static e_root_hub: string;
    static root_journey: string;
    static endpoint_post_journey_rain: string;
}
/**
 * Journey
 */
export declare class ApiJourneyUrlEnum {
    static root_journey: string;
    static e_root_journey: string;
    static endpoint_post_parcel_refuse: string;
    static endpoint_post_rain: string;
    static endpoint_get_journey_events: string;
    static endpoint_ambassador: string;
}
/**
 * Rack
 */
export declare class ApiRackUrlEnum {
    static root_rack: string;
    static e_root_rack: string;
    static root_rack_position: string;
    static e_root_rack_position: string;
}
/**
 * Parcel
 */
export declare class ApiParcelUrlEnum {
    static root_parcel: string;
    static e_root_parcel: string;
    static endpoint_post_create_delivery: string;
    static endpoint_post_parcel_refuse: string;
    static endpoint_post_parcel_ready: string;
    static endpoint_put_remove_bag_parcel: string;
    static endpoint_post_return_parcel_to_provider: string;
    static endpoint_post_return_parcel_to_hub: string;
    static endpoint_get_parcel_event_history: string;
    static endpoint_customer_handover: string;
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
 * Invoice
 */
export declare class ApiInvoiceUrlEnum {
    static root_invoice: string;
    static e_root_invoice: string;
    static root_item: string;
    static e_root_item: string;
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
 * Pro
 */
export declare class ApiProUrlEnum {
    static root_pro: string;
    static e_root_pro: string;
}
/**
 * Provider
 */
export declare class ApiProviderUrlEnum {
    static root_provider: string;
    static e_root_provider: string;
    static e_root_provider_stats: string;
    static root_provider_hub: string;
    static e_root_provider_hub: string;
    static e_root_provider_hub_stats: string;
}
/**
 * Society
 */
export declare class ApiSocietyUrlEnum {
    static root_society: string;
    static e_root_society: string;
}
/**
 * User
 */
export declare class ApiUserUrlEnum {
    static root_user: string;
    static e_root_user: string;
    static e_root_shopper: string;
    static e_root_user_send_verification_code: string;
    static e_root_user_confirm_subscription: string;
    static e_root_user_shopper_transport_type: string;
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
/**
 * Search
 */
export declare class ApiSearchUrlEnum {
    static root_search: string;
    static e_root_search: string;
    static e_root_search_retail_point: string;
}
/**
 * Target
 */
export declare class ApiTargetEnum {
    static root_target: string;
    static e_root_target: string;
    static target_category: string;
    static e_root_target_execute: string;
    static e_root_target_preview: string;
}
