export declare class YperException extends Error {
    protected _description: string;
    protected _scope: string;
    protected _code: number;
    constructor(message?: string, scope?: string, code?: number);
    getMessage(): string;
    getScope(): string;
    getCode(): number;
}
export declare class GoogleMapError extends YperException {
}
export declare class CallbackError extends YperException {
}
export declare class AjaxCallbackError extends YperException {
    protected _scope: string;
}
export declare class SearchEngineArgsError extends YperException {
    protected _scope: string;
    protected _description: string;
    protected _code: number;
}
