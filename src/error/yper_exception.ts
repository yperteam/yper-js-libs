export class YperException extends Error {
    protected _description = "YperException Error";
    protected _scope = "yper_error";
    protected _code = 500;

    constructor(
        message: string = null,
        scope: string = null,
        code: number = null
    ) {
        super(message);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, new.target.prototype);

        this._code = code ? code : this._code;
        this._scope = scope ? scope : this._scope;
        this._description = message ? message : this._description;
    }

    public getMessage() {
        return this._description;
    }

    public getScope() {
        return this._scope;
    }

    public getCode() {
        return this._code;
    }
}

export class GoogleMapError extends YperException {}
export class CallbackError extends YperException {}
export class AjaxCallbackError extends YperException {
    protected _scope = "ajax_error";
}
export class SearchEngineArgsError extends YperException {
    protected _scope = "search_engine_args_error";
    protected _description = "You need to register a valid property";
    protected _code = 403;
}
