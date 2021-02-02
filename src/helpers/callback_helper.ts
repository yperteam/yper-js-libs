import { CallbackError } from "@yper-script/error/YperException";

export class CallbackHelper {
    private callback: Function = null;
    private parameters: any = null;

    constructor(callback: Function = null, parameters: {} = null) {
        this.setCallback(callback);
        this.setParameters(parameters);
    }

    public setCallback(callback: Function) {
        if (callback instanceof Function) {
            this.callback = callback;
        }

        return this;
    }

    public setParameters(parameters: any) {
        this.parameters = parameters;

        return this;
    }

    public getParameters() {
        return this.parameters;
    }

    public getCallback() {
        return this.callback;
    }

    public call() {
        if (this.callback instanceof Function) {
            this.callback(this.getParameters());
        } else {
            throw new CallbackError(
                "Callback is not a function",
                "missing_callback",
                400
            );
        }
    }
}
