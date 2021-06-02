import {AbstractLib} from "../libs/abstract_lib";
import {ApiParcelUrlEnum} from "../enums/api_url_enum";

export default class ParcelController extends AbstractLib {

    /**
     * @constructor
     * @param $elem
     */
    constructor(
        $elem: JQuery<HTMLElement> | null = null
    ) {
        super();
        this.setLoader($elem);
    }

    /**
     * Create a delivery for a parcel (or append it in existing delivery)
     */
    public async createDelivery(): Promise<any> {
        return this._postPromise(ApiParcelUrlEnum.endpoint_post_create_delivery);
    }

    /**
     * Refuse a unique parcel
     */
    public async refuseParcel(): Promise<any> {
        return this._postPromise(ApiParcelUrlEnum.endpoint_post_parcel_refuse);
    }

    /**
     * Parcel is ready
     */
    public async readyParcel(): Promise<any> {
        return this._postPromise(ApiParcelUrlEnum.endpoint_post_parcel_ready);
    }

    /**
     * Remove bag parcel
     */
    public async removeBagParcel(): Promise<any> {
        return this._putPromise(ApiParcelUrlEnum.endpoint_put_remove_bag_parcel);
    }
}