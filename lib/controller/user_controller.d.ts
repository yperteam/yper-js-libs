/// <reference types="jquery" />
/// <reference types="jquery.blockui" />
/// <reference types="jqueryui" />
/// <reference types="bootstrap" />
import { AbstractLib } from "../libs/abstract_lib";
export default class UserController extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem?: JQuery<HTMLElement> | null);
    /**
     * Subscribe user - Need to define your own route
     */
    subscribe(path: string): Promise<any>;
    /**
     * Confirm User Subscription
     */
    confirmSubscription(): Promise<any>;
    /**
     * Confirm User Phone
     */
    sendVerificationCode(): Promise<any>;
    /**
     * Get user infos
     */
    getUser(): Promise<any>;
    /**
     * Put user/shopper TransportType
     */
    putShopperTransportType(): Promise<any>;
}
