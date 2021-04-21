export class AbstractApiUrlEnum {
    public static root = "/ajax";
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
    public static delivery_timeslot = ApiDeliveryUrlEnum.e_root_delivery + "/delivery_timeslot";
    public static transfer_journey = ApiDeliveryUrlEnum.e_root_delivery + "/transfer_journey";

    public static root_delivery_parcel = ApiDeliveryUrlEnum.e_root_delivery + "/parcel";
    public static endpoint_post_parcel_refuse = ApiDeliveryUrlEnum.root_delivery_parcel + "/refuse";
    public static endpoint_post_pending_hub_customer_handover = ApiDeliveryUrlEnum.root_delivery_parcel + "/pending_hub_customer_handover";
}

/**
 * Parcel
 */
export class ApiParcelUrlEnum {
    public static root_parcel = AbstractApiUrlEnum.root + "/parcel";
    public static e_root_parcel = ApiParcelUrlEnum.root_parcel + "/{0}";

    public static endpoint_post_parcel_refuse = ApiParcelUrlEnum.e_root_parcel + "/refuse";
    public static endpoint_post_parcel_ready = ApiParcelUrlEnum.e_root_parcel + "/ready";
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
 * User
 */
export class ApiUserUrlEnum {
    public static root_user = AbstractApiUrlEnum.root + "/user";
    public static e_root_user = ApiUserUrlEnum.root_user + "/{0}";

    public static e_root_user_confirm_subscription = ApiUserUrlEnum.e_root_user + "/phone/verify";
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
