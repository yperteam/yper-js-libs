export enum SearchProParamsEnum {
    enabled = "enabled",
    subscription_id = "subscription_id",
    has_ordered_delivery = "has_ordered_delivery",
    createdAt__gte = "createdAt__gte",
    createdAt__lte = "createdAt__lte",
    q = "q",
    sort = "sort",
}

export enum SearchDeliveriesParamsEnum {
    is_ceremony = "is_ceremony",
    new_shopper = "deliverer__is_new",
    liked_shopper = "deliverer__is_favorite_for_pro",
    new_pro = "is_new_pro",
    retailpoint_id = "retailpoint_id",
    deliverer__id = "deliverer__id",
    customer__id = "customer__id",
    customer__type = "customer__type",
    q = "q",
    is_late = "is_late",
    status = "status__in",
    sort = "sort",
    expand = "expand",
    pro_id = "pro_id",
    mission_start = "date__deliveryStart__gte",
    mission_end = "date__deliveryEnd__lte",
}

export enum SearchParcelParamsEnum {
    q = "q",
    status = "status__in",
    sort = "sort",
    start = "created_at__gte",
    end = "created_at__lte",
    size = "attributes__size",
    new_rider = "delivery__deliverer__is_new",
    // hub = "hub__company_infos__name",
    hub = "hub__id",
}

export enum SearchParcelStatsParamsEnum {
    start = "start",
    end = "end",
}

export enum SearchJourneyParamsEnum {
    q = "q",
    status = "status__in",
    sort = "sort",
    start = "dateStart__gte",
    end = "dateEnd__lte",
    hub = "hub__id",
    size = "attributes__size",
    deliverer_type = "deliverer__type__in",
    new_deliverer = "delivery__deliverer__is_new",
    new_pro_deliverer = "",
}

export enum SearchJourneyStatsParamsEnum {
    start = "start",
    end = "end",
}

export enum SearchUserParamsEnum {
    connection_start = "last_connection__gte",
    connection_end = "last_connection__lte",
    created_start = "createdAt__gte",
    created_end = "createdAt__lte",
    user_types = "user_types",
    q = "q",
}

export enum SearchCommonParamsEnum {
    created_start = "createdAt__gte",
    created_end = "createdAt__lte",
}

export enum DeliveriesStatsParamsEnum {
    mission_start = "mission_start",
    mission_end = "mission_end",
}

export enum RetailPointParamsEnum {
    enabled = "enabled",
    q = "q",
}

export enum HubParamsEnum {
    active = "active",
    q = "q",
}

export enum GetDeliveriesParamsEnum {
    retailpoint_id = "retailpoint_id",
    sort = "sort",
    status = "status",
}

export enum DateInvoiceParamsEnum {
    start = "start",
    end = "end",
}

export enum SearchInvoiceParamsEnum {
    start = "createdAt__gte",
    end = "createdAt__lte",
    type = "type__in",
    q = "q",
    min_price = "price__ttc__gte",
    max_price = "price__ttc__lte",
    status = "status",
}

export enum AdminInvoiceStatsParamsEnum {
    start = "start",
    end = "end",
    status = "status",
    payed = "payed",
    is_late = "is_late",
}
