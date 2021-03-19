import {AbstractLib} from "../libs/abstract_lib";
import {ApiDeliveryUrlEnum} from "../enums/api_url_enum";

export default class DeliveryController extends AbstractLib {
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
     * Update delivery data
     */
    public async shiftDelivery(): Promise<any> {
        return this._postPromise(ApiDeliveryUrlEnum.shift_delivery);
    }

    /**
     * Update delivery data
     */
    public async updateDelivery(): Promise<any> {
        return this._putPromise(ApiDeliveryUrlEnum.e_root_delivery);
    }

    /**
     * Get delivery timeslot data
     */
    public async getTimeslot(): Promise<any> {
        return this._getPromise(ApiDeliveryUrlEnum.delivery_timeslot);
    }

    /**
     * Get delivery data
     */
    public async getDelivery(): Promise<any> {
        return this._getPromise(ApiDeliveryUrlEnum.e_root_delivery);
    }
}