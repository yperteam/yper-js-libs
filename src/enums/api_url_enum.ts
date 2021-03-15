export class AbstractApiUrlEnum {
    public static root = "/ajax";
}

/**
 * Delivery
 */
export class ApiDeliveryUrlEnum {
    public static root_delivery = AbstractApiUrlEnum.root + "/delivery";
    public static e_root_delivery = ApiDeliveryUrlEnum.root_delivery + "/{0}";
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
