import {AbstractLib} from "../libs/abstract_lib";
import {ApiAdminDeliveryUrlEnum} from "../enums/api_url_enum";

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
     * Refuse delivery's parcel(s)
     */
    public async refuseParcel(): Promise<any> {
        return this._postPromise(ApiAdminDeliveryUrlEnum.endpoint_post_parcel_refuse);
    }
}