/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="datatables.net" />
/// <reference types="jquery.blockui" />
/// <reference types="jqueryui" />
/// <reference types="bootstrap" />
/// <reference types="select2" />
import { AbstractLib } from "../libs/abstract_lib";
export default class DeliveryController extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem?: JQuery<HTMLElement> | null);
    /**
     * Delete the shopper of the delivery
     */
    deleteShopper(): Promise<any>;
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
     * Get delivery events
     */
    getEvents(): Promise<any>;
    /**
     * Transfer journey
     */
    transferJourney(): Promise<any>;
    /**
     * Mark all parcels of a delivery as pending hub customer handover
     */
    pendingHubCustomerHandover(): Promise<any>;
    /**
     * Defray delivery's shopper
     */
    defrayShopper(): Promise<any>;
    /**
     * Get Neighbour Infos on delivery
     */
    getNeighbourInfos(): Promise<any>;
}
