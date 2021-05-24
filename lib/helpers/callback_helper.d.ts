export default class CallbackHelper {
    private callback;
    private parameters;
    constructor(callback?: Function, parameters?: {});
    setCallback(callback: Function): this;
    setParameters(parameters: any): this;
    getParameters(): any;
    getCallback(): Function;
    call(): void;
}
