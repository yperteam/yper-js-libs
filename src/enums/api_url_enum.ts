export class AbstractApiUrlEnum {
    public static root = "/ajax";
}

export class ApiDeliveryUrlEnum {
    public static root_delivery = AbstractApiUrlEnum.root + "/delivery";
    public static e_root_delivery = ApiDeliveryUrlEnum.root_delivery + "/{0}";
<<<<<<< Updated upstream
=======

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
    public static e_root_voucher = AbstractApiUrlEnum.root + "/{0}";
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
>>>>>>> Stashed changes
}

export class ApiRetailPointUrlEnum {
    public static root_retail_point = AbstractApiUrlEnum.root + "/retailpoint";
    public static e_root_retail_point = ApiRetailPointUrlEnum.root_retail_point + "/{0}";

    public static get_retail_point_search = ApiRetailPointUrlEnum.root_retail_point + "/search";
}