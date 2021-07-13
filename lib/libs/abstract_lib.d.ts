/// <reference types="jquery" />
/// <reference types="jquery.blockui" />
/// <reference types="jqueryui" />
/// <reference types="bootstrap" />
/**
 * Abstract lib to manage libs
 */
import CallbackHelper from "../helpers/callback_helper";
/**
 * AbstractLib
 */
export declare abstract class AbstractLib {
    /** path params */
    protected cHelper: CallbackHelper | null;
    /** path params */
    protected pathParams: string[];
    /** query params */
    protected queryParams: string;
    /** Payload params */
    protected payloadParams: {};
    /** Loader */
    private loader;
    /** Must we do a custom fail */
    private customFail;
    /**
     *
     * @param pathParams
     */
    setPathParams(pathParams: string[]): void;
    /**
     *
     * @param queryParams
     */
    setQueryParams(queryParams: string): void;
    /**
     *
     * @param pathParams
     */
    addPathParams(pathParams: string[]): void;
    /**
     *
     */
    getPayloadParams(): {};
    /**
     *
     * @param payloadParams
     */
    setPayloadParams(payloadParams: {}): void;
    /**
     *
     * @param customFail
     */
    setCustomFail(customFail: boolean): void;
    /**
     *
     * @param payloadParams
     */
    addPayloadParams(payloadParams: {}): void;
    /**
     *
     * @param $elem
     * @param text
     */
    setLoader($elem: JQuery<HTMLElement> | null, text?: string): void;
    /**
     *
     * @param toasterTitle
     * @param toasterMessage
     */
    static successProcess(toasterTitle?: string, toasterMessage?: string): void;
    /**
     *
     * @param errorYperCode
     */
    static shouldLogout(errorYperCode: string): void;
    /**
     *
     * @param resp
     * @param toasterTitle
     * @param toasterMessage
     */
    static failProcess(resp: any, toasterTitle?: string, toasterMessage?: string): void;
    /**
     *
     * @param callback
     */
    setCallback(callback: Function): this;
    /**
     *
     * @param path
     * @private
     */
    protected _getPromise(path: string): Promise<unknown>;
    /**
     *
     * @param path
     * @private
     */
    protected _get(path: string): void;
    /**
     *
     * @param path
     * @private
     */
    protected _postPromise(path: string): Promise<unknown>;
    /**
     *
     * @param path
     * @private
     */
    protected _patchPromise(path: string): Promise<unknown>;
    /**
     *
     * @param path
     * @private
     */
    protected _putPromise(path: string): Promise<unknown>;
    /**
     *
     * @param path
     * @private
     */
    protected _post(path: string): void;
    /**
     *
     * @param path
     * @private
     */
    protected _put(path: string): void;
    /**
     *
     * @param path
     * @private
     */
    protected _delete(path: string): void;
    /**
     *
     * @param path
     * @private
     */
    protected _deletePromise(path: string): Promise<unknown>;
}
