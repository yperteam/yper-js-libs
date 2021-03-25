import {AbstractLib} from "../libs/abstract_lib";
import {ApiAdminDeliveryUrlEnum, ApiDeliveryUrlEnum} from "../enums/api_url_enum";

export default class AdminDeliveryController extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor(
        $elem: JQuery<HTMLElement> | null = null
    ) {
        super();
        this.setLoader($elem);
    }

    /**
     * Declare delivery as failed (Parcel)
     */
    public async postFailure(): Promise<any> {
        return this._postPromise(ApiAdminDeliveryUrlEnum.endpoint_post_delivery_failure);
    }
}