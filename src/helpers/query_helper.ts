/**
 * QueryHelper used to format our call
 */
import { keyExists, removeKey } from "./generic_helper";

export default class QueryHelper {
    protected formattedUrl: string = "";
    protected formattedParameters: string = "";
    protected path: string = "";
    protected parameters: {} = {};

    /**
     * Constructor
     * @param {string} path - url to call
     * @param {object} queryParameters - query params to format {key : value}
     */
    constructor(path: string = null, queryParameters: object = {}) {
        this.path = path;
        this.parameters = queryParameters;
        this.setFormattedParameters();
        this.formattedUrl = this.getFormattedUrl();
    }

    /**
     * Get formatted url from the path and parameters
     */
    public getFormattedUrl() {
        return this.formattedUrl;
    }

    /**
     * Remove all parameters
     */
    public removeAllParameters() {
        this.parameters = {};
        this.setFormattedParameters();

        return this;
    }

    /**
     * Return path
     */
    public getPath() {
        return this.path;
    }

    /**
     * Return parameters
     */
    public getParams() {
        return this.parameters;
    }

    /**
     * Return number of parameters
     */
    public getNbParams() {
        return Object.keys(this.getParams()).length;
    }

    /**
     * Return a specific parameter
     * @param key
     */
    public getParam(key: string) {
        if (keyExists(this.parameters, key)) {
            // @ts-ignore
            return this.parameters[key];
        }
        return null;
    }

    /**
     * Return formatted parameters
     */
    public getFormattedParams() {
        return this.formattedParameters;
    }

    /**
     * Update parameters
     * @param parameters
     */
    public updateParams(parameters: object = {}) {
        for (const [key, value] of Object.entries(parameters)) {
            // @ts-ignore
            this.parameters[key] = value;
        }
        this.setFormattedParameters();

        return this;
    }

    /**
     * Check if key exists among parameters
     * @param key
     */
    public keyParametersExists(key: string) {
        return keyExists(this.parameters, key);
    }

    /**
     * Remove an array of key(s) from parameters
     * @param {array} keysToRemove - array of key(s) to remove
     */
    public removeParameters(keysToRemove: string[]) {
        if (keysToRemove.length > 0) {
            keysToRemove.forEach(key => {
                this.parameters = removeKey(this.parameters, key);
            });
            this.setFormattedParameters();
        }

        return this;
    }

    /**
     * Create or Remove an array of key(s) from parameters
     * @param {array} keysToToggle - array of key(s) to remove
     */
    public toggleParameters(keysToToggle: string[]) {
        if (keysToToggle.length > 0) {
            keysToToggle.forEach((key: string) => {
                if (keyExists(this.parameters, key) !== undefined) {
                    // @ts-ignore
                    delete this.parameters[key];
                } else {
                    // @ts-ignore
                    this.parameters[key] = true;
                }
            });
            this.setFormattedParameters();
        }

        return this;
    }

    /**
     * Set Query Parameters
     * @param {object} queryParameters - query params to update {key : value}
     */
    public setParams(queryParameters: object = {}) {
        this.parameters = queryParameters;
        this.setFormattedParameters();

        return this;
    }

    /**
     * Format the querystring
     */
    private setFormattedParameters() {
        let rawQueryString = "?";
        let i = 0;

        if (Object.keys(this.parameters).length === 0) {
            this.formattedUrl = this.path;
            return this;
        }
        for (let [index, keyQS] of Object.entries(this.parameters)) {
            i++;
            if (Array.isArray(keyQS)) {
                keyQS = keyQS.join();
            }
            rawQueryString += `${index}=${keyQS}`;
            if (i < Object.keys(this.parameters).length) {
                rawQueryString += "&";
            }
        }
        this.formattedParameters = rawQueryString;
        this.formattedUrl = `${this.path}${this.formattedParameters}`;

        return this;
    }
}
