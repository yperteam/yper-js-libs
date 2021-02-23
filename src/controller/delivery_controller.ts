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
    public async updateDelivery(): Promise<any> {
        return this._putPromise(ApiDeliveryUrlEnum.e_root_delivery);
    }

    /**
     * Get delivery data
     */
    public async getDelivery(): Promise<any> {
        return this._getPromise(ApiDeliveryUrlEnum.e_root_delivery);
    }
}