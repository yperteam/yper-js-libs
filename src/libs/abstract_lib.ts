/**
 * Abstract lib to manage libs
 */
import CallbackHelper  from "../helpers/callback_helper";
import { formatString, get } from "../helpers/generic_helper";
import { AjaxCallbackError } from "../error/yper_exception";
import {LoaderHelper} from "../helpers/loader_helper";

/**
 * AbstractLib
 */
export abstract class AbstractLib {
    /** path params */
    protected cHelper: CallbackHelper | null = null;

    /** path params */
    protected pathParams: string[] = [];

    /** query params */
    protected queryParams: string = "";

    /** Payload params */
    protected payloadParams: {} = {};

    /** Loader */
    private loader: LoaderHelper | null = null;

    /** Must we do a custom fail */
    private customFail: boolean = false;

    /**
     *
     * @param pathParams
     */
    public setPathParams(pathParams: string[]) {
        this.pathParams = pathParams;
    }

    /**
     *
     * @param queryParams
     */
    public setQueryParams(queryParams: string) {
        this.queryParams = queryParams;
    }

    /**
     *
     * @param pathParams
     */
    public addPathParams(pathParams: string[]) {
        pathParams.map(pParam => {
            this.pathParams.push(pParam);
        });
    }

    /**
     *
     */
    public getPayloadParams() {
        return this.payloadParams;
    }

    /**
     *
     * @param payloadParams
     */
    public setPayloadParams(payloadParams: {}) {
        this.payloadParams = payloadParams;
    }

    /**
     *
     * @param customFail
     */
    public setCustomFail(customFail: boolean) {
        this.customFail = customFail;
    }

    /**
     *
     * @param payloadParams
     */
    public addPayloadParams(payloadParams: {}) {
        for (const [key, value] of Object.entries(payloadParams)) {
            // @ts-ignore
            this.payloadParams[key] = value;
        }
    }

    /**
     *
     * @param $elem
     */
    public setLoader($elem: JQuery<HTMLElement> | null) {
        if ($elem) {
            this.loader = new LoaderHelper($elem);
        }
    }

    /**
     *
     * @param toasterTitle
     * @param toasterMessage
     */
    public static successProcess(
        toasterTitle: string = null,
        toasterMessage: string = null
    ) {

    }

    /**
     *
     * @param errorYperCode
     */
    public static shouldLogout(errorYperCode: string) {

    }

    /**
     *
     * @param resp
     * @param toasterTitle
     * @param toasterMessage
     */
    public static failProcess(
        resp: any,
        toasterTitle: string = null,
        toasterMessage: string = null
    ) {
        const errorTitle: string = get(resp, ["statusText"], "");
        const errorMessage: string = get(resp, ["responseText"], "");
        const errorYperCode: string = get(resp, ["responseJSON", "yper_code"], "");

        console.error(errorTitle, errorMessage);
        AbstractLib.shouldLogout(errorYperCode);
        $(".modal").modal("hide");
        new AjaxCallbackError("ajax_error", resp.responseText, resp.status);
    }

    /**
     *
     * @param callback
     */
    public setCallback(callback: Function) {
        if (
            callback instanceof Function &&
            this.cHelper instanceof CallbackHelper
        ) {
            this.cHelper.setCallback(callback);
        }

        return this;
    }

    /**
     *
     * @param path
     * @private
     */
    protected async _getPromise(path: string) {
        if (this.loader) {
            this.loader.initLoader();
        }
        return new Promise((resolve, reject) => {
            $.ajax({
                url: formatString(path, this.pathParams) + this.queryParams,
                type: "GET",
            })
                .fail(r => {
                    if (this.customFail) {
                        reject(r);
                    } else {
                        reject(AbstractLib.failProcess(r));
                    }
                })
                .then(data => {
                    resolve(data);
                })
                .always(data => {
                    if (this.loader) {
                        this.loader.hideLoader();
                    }
                });
        });
    }

    /**
     *
     * @param path
     * @private
     */
    protected _get(path: string) {
        if (this.loader) {
            this.loader.initLoader();
        }
        $.ajax({
            url: formatString(path, this.pathParams) + this.queryParams,
            type: "GET",
        })
            .fail(r => {
                AbstractLib.failProcess(r);
            })
            .then(data => {
                if (this.cHelper instanceof CallbackHelper) {
                    this.cHelper.setParameters(data);
                    this.cHelper.call();
                }
                return data;
            })
            .always(data => {
                if (this.loader) {
                    this.loader.hideLoader();
                }
            });
    }

    /**
     *
     * @param path
     * @private
     */
    protected async _postPromise(path: string) {
        const pathParams = this.pathParams;
        const payloadParams = this.payloadParams;

        if (this.loader) {
            this.loader.initLoader();
        }
        return new Promise((resolve, reject) => {
            $.ajax({
                url: formatString(path, this.pathParams) + this.queryParams,
                type: "POST",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(this.payloadParams),
            })
                .fail(r => {
                    if (this.customFail) {
                        reject(r);
                    } else {
                        reject(AbstractLib.failProcess(r));
                    }
                })
                .then(data => {
                    resolve(data);
                })
                .always(data => {
                    if (this.loader) {
                        this.loader.hideLoader();
                    }
                });
        });
    }

    /**
     *
     * @param path
     * @private
     */
    protected async _patchPromise(path: string) {
        if (this.loader) {
            this.loader.initLoader();
        }
        return new Promise((resolve, reject) => {
            $.ajax({
                url: formatString(path, this.pathParams) + this.queryParams,
                type: "PATCH",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(this.payloadParams),
            })
                .fail(r => {
                    if (this.customFail) {
                        reject(r);
                    } else {
                        reject(AbstractLib.failProcess(r));
                    }
                })
                .then(data => {
                    resolve(data);
                })
                .always(data => {
                    if (this.loader) {
                        this.loader.hideLoader();
                    }
                });
        });
    }

    /**
     *
     * @param path
     * @private
     */
    protected async _putPromise(path: string) {
        const pathParams = this.pathParams;
        const payloadParams = this.payloadParams;

        if (this.loader) {
            this.loader.initLoader();
        }
        return new Promise((resolve, reject) => {
            $.ajax({
                url: formatString(path, this.pathParams) + this.queryParams,
                type: "PUT",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(this.payloadParams),
            })
                .fail(r => {
                    if (this.customFail) {
                        reject(r);
                    } else {
                        reject(AbstractLib.failProcess(r));
                    }
                })
                .then(data => {
                    resolve(data);
                })
                .always(data => {
                    if (this.loader) {
                        this.loader.hideLoader();
                    }
                });
        });
    }

    /**
     *
     * @param path
     * @private
     */
    protected _post(path: string) {
        if (this.loader) {
            this.loader.initLoader();
        }
        $.ajax({
            url: formatString(path, this.pathParams) + this.queryParams,
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(this.payloadParams),
        })
            .fail(r => {
                AbstractLib.failProcess(r);
            })
            .then(data => {
                if (this.cHelper instanceof CallbackHelper) {
                    this.cHelper.setParameters(data);
                    this.cHelper.call();
                }
                return data;
            })
            .always(data => {
                if (this.loader) {
                    this.loader.hideLoader();
                }
            });
    }

    /**
     *
     * @param path
     * @private
     */
    protected _put(path: string) {
        if (this.loader) {
            this.loader.initLoader();
        }
        $.ajax({
            url: formatString(path, this.pathParams) + this.queryParams,
            type: "PUT",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(this.payloadParams),
        })
            .fail(r => {
                AbstractLib.failProcess(r);
            })
            .then(data => {
                if (this.cHelper instanceof CallbackHelper) {
                    this.cHelper.setParameters(data);
                    this.cHelper.call();
                }
                return data;
            })
            .always(data => {
                if (this.loader) {
                    this.loader.hideLoader();
                }
            });
    }

    /**
     *
     * @param path
     * @private
     */
    protected _delete(path: string) {
        if (this.loader) {
            this.loader.initLoader();
        }
        $.ajax({
            url: formatString(path, this.pathParams) + this.queryParams,
            type: "DELETE",
        })
            .fail(r => {
                AbstractLib.failProcess(r);
            })
            .then(data => {
                if (this.cHelper instanceof CallbackHelper) {
                    this.cHelper.setParameters(data);
                    this.cHelper.call();
                }
                return data;
            })
            .always(data => {
                if (this.loader) {
                    this.loader.hideLoader();
                }
            });
    }

    /**
     *
     * @param path
     * @private
     */
    protected _deletePromise(path: string) {
        if (this.loader) {
            this.loader.initLoader();
        }
        return new Promise((resolve, reject) => {
            $.ajax({
                url: formatString(path, this.pathParams) + this.queryParams,
                type: "DELETE",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(this.payloadParams),
            })
                .fail(r => {
                    if (this.customFail) {
                        reject(r);
                    } else {
                        reject(AbstractLib.failProcess(r));
                    }
                })
                .then(data => {
                    resolve(data);
                })
                .always(data => {
                    if (this.loader) {
                        this.loader.hideLoader();
                    }
                });
        });
    }
}
