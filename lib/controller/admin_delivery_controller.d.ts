/// <reference types="jquery" />
/// <reference types="jquery.blockui" />
/// <reference types="jqueryui" />
/// <reference types="bootstrap" />
import { AbstractLib } from "../libs/abstract_lib";
export default class AdminDeliveryController extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem?: JQuery<HTMLElement> | null);
    /**
     * Refuse delivery's parcel(s)
     */
    refuseParcel(): Promise<any>;
}
