/// <reference types="jquery" />
/// <reference types="jquery.blockui" />
/// <reference types="jqueryui" />
/// <reference types="bootstrap" />
import { AbstractLib } from "../libs/abstract_lib";
export default class DeliveryController extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem?: JQuery<HTMLElement> | null);
    /**
     * Patch delivery data
     */
    patchDelivery(): Promise<any>;
    /**
     * Refuse delivery's parcel(s)
     */
    refuseParcel(): Promise<any>;
    /**
     * Update delivery data
     */
    shiftDelivery(): Promise<any>;
    /**
     * Update delivery data
     */
    updateDelivery(): Promise<any>;
    /**
     * Get delivery timeslot data
     */
    getTimeslot(): Promise<any>;
    /**
     * Get delivery data
     */
    getDelivery(): Promise<any>;
    /**
     * Transfer journey
     */
    transferJourney(): Promise<any>;
}
