/// <reference types="jquery" />
/// <reference types="jquery.blockui" />
/// <reference types="jqueryui" />
/// <reference types="bootstrap" />
import { AbstractLib } from "../libs/abstract_lib";
export default class ParcelController extends AbstractLib {
    /**
     * @constructor
     * @param $elem
     */
    constructor($elem?: JQuery<HTMLElement> | null);
    /**
     * Create a delivery for a parcel (or append it in existing delivery)
     */
    createDelivery(): Promise<any>;
    /**
     * Refuse a unique parcel
     */
    refuseParcel(): Promise<any>;
    /**
     * Parcel is ready
     */
    readyParcel(): Promise<any>;
    /**
     * Remove bag parcel
     */
    removeBagParcel(): Promise<any>;
    /**
     * return parcel to provider
     */
    returnParcelToProvider(): Promise<any>;
    /**
     * return parcel to hub
     */
    returnParcelToHub(): Promise<any>;
    /**
     * patch parcel
     */
    patchParcel(): Promise<any>;
}
