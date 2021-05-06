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
     * Delete the shopper of the delivery
     */
    public async deleteShopper(): Promise<any> {
        return this._deletePromise(ApiDeliveryUrlEnum.delete_shopper);
    }

    /**
     * Patch delivery data
     */
    public async patchDelivery(): Promise<any> {
        return this._putPromise(ApiDeliveryUrlEnum.patch_delivery);
    }

    /**
     * Refuse delivery's parcel(s)
     */
    public async refuseParcel(): Promise<any> {
        return this._postPromise(ApiDeliveryUrlEnum.endpoint_post_parcel_refuse);
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

    /**
     * Transfer journey
     */
    public async transferJourney(): Promise<any> {
        return this._postPromise(ApiDeliveryUrlEnum.transfer_journey);
    }

    /**
     * Mark all parcels of a delivery as pending hub customer handover
     */
    public async pendingHubCustomerHandover(): Promise<any> {
        return this._postPromise(ApiDeliveryUrlEnum.endpoint_post_pending_hub_customer_handover);
    }
}