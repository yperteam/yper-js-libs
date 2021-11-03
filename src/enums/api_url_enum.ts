export class AbstractApiUrlEnum {
    public static root = "/ajax";
}

/**
 * Admin
 */
export class ApiAdminEnum {
    public static root_admin = AbstractApiUrlEnum.root + "/admin";
    public static send_admin_message = ApiAdminEnum.root_admin + "/message";
    public static endpoint_user_reactivate =  ApiAdminEnum.root_admin + "/user/{0}/reactivate";
}

/**
 * Admin Delivery
 */
export class ApiAdminDeliveryUrlEnum {
    public static root_admin_delivery = AbstractApiUrlEnum.root + "/admin/delivery";
    public static e_root_admin_delivery = ApiAdminDeliveryUrlEnum.root_admin_delivery + "/{0}";

    public static root_admin_mission_parcel = ApiAdminDeliveryUrlEnum.e_root_admin_delivery + "/parcel";
    public static e_root_admin_mission_parcel = ApiAdminDeliveryUrlEnum.root_admin_mission_parcel + "/{1}";
    public static endpoint_post_delivery_failure = ApiAdminDeliveryUrlEnum.root_admin_mission_parcel + "/delivery_failure";
}

/**
 * Delivery
 */
export class ApiDeliveryUrlEnum {
    public static root_delivery = AbstractApiUrlEnum.root + "/delivery";
    public static e_root_delivery = ApiDeliveryUrlEnum.root_delivery + "/{0}";

    public static patch_delivery = ApiDeliveryUrlEnum.e_root_delivery + "/patch";
    public static shift_delivery = ApiDeliveryUrlEnum.e_root_delivery + "/shift";
    public static delete_shopper = ApiDeliveryUrlEnum.e_root_delivery + "/shopper";
    public static delivery_timeslot = ApiDeliveryUrlEnum.e_root_delivery + "/delivery_timeslot";
    public static transfer_journey = ApiDeliveryUrlEnum.e_root_delivery + "/transfer_journey";
    public static neighbour_deposit = ApiDeliveryUrlEnum.e_root_delivery + "/neighbor_deposit";
    public static get_events = ApiDeliveryUrlEnum.e_root_delivery + "/event";

    public static root_delivery_parcel = ApiDeliveryUrlEnum.e_root_delivery + "/parcel";
    public static endpoint_post_parcel_refuse = ApiDeliveryUrlEnum.root_delivery_parcel + "/refuse";
    public static endpoint_post_pending_hub_customer_handover = ApiDeliveryUrlEnum.root_delivery_parcel + "/pending_hub_customer_handover";
    public static endpoint_post_defray_shopper = ApiDeliveryUrlEnum.e_root_delivery + "/delta_cost";
}

/**
 * DMP
 */
export class ApiDmpUrlEnum {
    public static availability_color = AbstractApiUrlEnum.root + "/availability_color";
}

/**
 * Voucher
 */
export class ApiVoucherUrlEnum {
    public static root_voucher = AbstractApiUrlEnum.root + "/voucher";
    public static e_root_voucher = ApiVoucherUrlEnum.root_voucher + "/{0}";
    public static endpoint_post_deactivate = ApiVoucherUrlEnum.e_root_voucher + "/deactivate";
}

/**
 * Document
 */
export class ApiDocumentUrlEnum {
    public static root_document = AbstractApiUrlEnum.root + "/document";
    public static e_root_document = ApiDocumentUrlEnum.root_document + "/{0}";
}

/**
 * Hub
 */
export class ApiHubUrlEnum {
    public static root_hub = AbstractApiUrlEnum.root + "/hub";
    public static e_root_hub = ApiHubUrlEnum.root_hub + "/{0}";

    public static root_journey = ApiHubUrlEnum.e_root_hub + "/journey";
    public static endpoint_post_journey_rain = ApiHubUrlEnum.root_journey + "/rain";
}

/**
 * Journey
 */
export class ApiJourneyUrlEnum {
    public static root_journey = AbstractApiUrlEnum.root + "/journey";
    public static e_root_journey = ApiJourneyUrlEnum.root_journey + "/{0}";

    public static endpoint_post_parcel_refuse = ApiJourneyUrlEnum.e_root_journey + "/mission";
    public static endpoint_post_rain = ApiJourneyUrlEnum.e_root_journey + "/rain";
    public static endpoint_get_journey_events = ApiJourneyUrlEnum.e_root_journey + "/event";
    public static endpoint_ambassador = ApiJourneyUrlEnum.e_root_journey + "/ambassador";
}

/**
 * Rack
 */
export class ApiRackUrlEnum {
    public static root_rack = AbstractApiUrlEnum.root + "/rack";
    public static e_root_rack = ApiRackUrlEnum.root_rack + "/{0}";

    public static root_rack_position = AbstractApiUrlEnum.root + "/rack_position";
    public static e_root_rack_position = ApiRackUrlEnum.root_rack_position + "/{0}";
}

/**
 * Parcel
 */
export class ApiParcelUrlEnum {
    public static root_parcel = AbstractApiUrlEnum.root + "/parcel";
    public static e_root_parcel = ApiParcelUrlEnum.root_parcel + "/{0}";

    public static endpoint_post_create_delivery = ApiParcelUrlEnum.e_root_parcel + "/delivery";
    public static endpoint_post_parcel_refuse = ApiParcelUrlEnum.e_root_parcel + "/refuse";
    public static endpoint_post_parcel_ready = ApiParcelUrlEnum.e_root_parcel + "/ready";
    public static endpoint_put_remove_bag_parcel = ApiParcelUrlEnum.e_root_parcel;
    public static endpoint_post_return_parcel_to_provider = ApiParcelUrlEnum.e_root_parcel + "/provider_return";
    public static endpoint_post_return_parcel_to_hub = ApiParcelUrlEnum.e_root_parcel + "/hub_return";
    public static endpoint_get_parcel_event_history = ApiParcelUrlEnum.e_root_parcel + "/event";
    public static endpoint_customer_handover = ApiParcelUrlEnum.e_root_parcel + "/customer_handover";
}

/**
 * RetailPoint
 */
export class ApiRetailPointUrlEnum {
    public static root_retail_point = AbstractApiUrlEnum.root + "/retailpoint";
    public static e_root_retail_point = ApiRetailPointUrlEnum.root_retail_point + "/{0}";

    public static get_retail_point_search = ApiRetailPointUrlEnum.root_retail_point + "/search";
}

/**
 * Invoice
 */
export class ApiInvoiceUrlEnum {
    public static root_invoice = AbstractApiUrlEnum.root + "/invoice";
    public static e_root_invoice = ApiInvoiceUrlEnum.root_invoice + "/{0}";

    public static root_item = ApiInvoiceUrlEnum.e_root_invoice + "/item";
    public static e_root_item = ApiInvoiceUrlEnum.root_item + "/{1}";
}

/**
 * Order
 */
export class ApiOrderUrlEnum {
    public static root_order = AbstractApiUrlEnum.root + "/order";
    public static e_root_order = ApiOrderUrlEnum.root_order + "/{0}";
    public static e_root_order_add_items = ApiOrderUrlEnum.e_root_order + "/add_items";
    public static e_root_order_pay = ApiOrderUrlEnum.e_root_order + "/pay";
    public static e_root_order_validate = ApiOrderUrlEnum.e_root_order + "/validate";
}

/**
 * Pro
 */
export class ApiProUrlEnum {
    public static root_pro = AbstractApiUrlEnum.root + "/pro";
    public static e_root_pro = ApiProUrlEnum.root_pro + "/{0}";
}

/**
 * Provider
 */
export class ApiProviderUrlEnum {
    public static root_provider = AbstractApiUrlEnum.root + "/provider";
    public static e_root_provider = ApiProviderUrlEnum.root_provider + "/{0}";
    public static e_root_provider_stats = ApiProviderUrlEnum.e_root_provider + "/stats";
    public static root_provider_hub = ApiProviderUrlEnum.e_root_provider + "/hub";
    public static e_root_provider_hub = ApiProviderUrlEnum.root_provider_hub + "/{1}";
    public static e_root_provider_hub_stats = ApiProviderUrlEnum.e_root_provider_hub + "/stats";
}

/**
 * Society
 */
export class ApiSocietyUrlEnum {
    public static root_society = AbstractApiUrlEnum.root + "/society";
    public static e_root_society = ApiSocietyUrlEnum.root_society + "/{0}";
}

/**
 * User
 */
export class ApiUserUrlEnum {
    public static root_user = AbstractApiUrlEnum.root + "/user";
    public static e_root_user = ApiUserUrlEnum.root_user + "/{0}";
    public static e_root_shopper = ApiUserUrlEnum.e_root_user + '/shopper';

    public static e_root_user_send_verification_code = ApiUserUrlEnum.e_root_user + "/phone/send_verification_code";
    public static e_root_user_confirm_subscription = ApiUserUrlEnum.e_root_user + "/phone/verify";
    public static e_root_user_shopper_transport_type = ApiUserUrlEnum.e_root_shopper + "/transport_type"
}

/**
 * UserPaymentMethod
 */
export class ApiUserPaymentMethodUrlEnum {
    public static root_user_payment_method = ApiUserUrlEnum.e_root_user + "/wallet/payment_method";
    public static e_root_user_payment_method = ApiUserPaymentMethodUrlEnum.root_user_payment_method + "/{1}";
    public static user_payment_method_primary = ApiUserPaymentMethodUrlEnum.e_root_user_payment_method + "/primary";
}

/**
 * PaymentIntent
 */
export class ApiPaymentIntentUrlEnum {
    public static root_payment_intent = AbstractApiUrlEnum.root + "/payment_intent";
    public static e_root_payment_intent = ApiPaymentIntentUrlEnum.root_payment_intent + "/{0}";
}

/**
 * Search
 */
export class ApiSearchUrlEnum {
    public static root_search = AbstractApiUrlEnum.root + "/search";
    public static e_root_search = ApiSearchUrlEnum.root_search + "/{0}";

    public static e_root_search_retail_point = ApiSearchUrlEnum.root_search + "/retailpoint";
}

/**
 * Target
 */
export class ApiTargetEnum {
    public static root_target = AbstractApiUrlEnum.root + "/target";
    public static e_root_target = ApiTargetEnum.root_target + "/{0}";
    public static target_category = AbstractApiUrlEnum.root + "/target_category";

    public static e_root_target_execute = ApiTargetEnum.e_root_target + '/execute';
    public static e_root_target_preview = ApiTargetEnum.e_root_target + '/preview';
}
