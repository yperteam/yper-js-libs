export class AbstractApiUrlEnum {
    public static root = "/ajax";
}

export class ApiDeliveryUrlEnum {
    public static root_delivery = AbstractApiUrlEnum.root + "/delivery";
    public static e_root_delivery = ApiDeliveryUrlEnum.root_delivery + "/{0}";
}

export class ApiRetailPointUrlEnum {
    public static root_retail_point = AbstractApiUrlEnum.root + "/retailpoint";
    public static e_root_retail_point = ApiRetailPointUrlEnum.root_retail_point + "/{0}";

    public static get_retail_point_search = ApiRetailPointUrlEnum.root_retail_point + "/search";
}