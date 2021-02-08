export default class QueryHelper {
    protected formattedUrl: string;
    protected formattedParameters: string;
    protected path: string;
    protected parameters: {};
    /**
     * Constructor
     * @param {string} path - url to call
     * @param {object} queryParameters - query params to format {key : value}
     */
    constructor(path?: string, queryParameters?: object);
    /**
     * Get formatted url from the path and parameters
     */
    getFormattedUrl(): string;
    /**
     * Remove all parameters
     */
    removeAllParameters(): this;
    /**
     * Return path
     */
    getPath(): string;
    /**
     * Return parameters
     */
    getParams(): {};
    /**
     * Return number of parameters
     */
    getNbParams(): number;
    /**
     * Return a specific parameter
     * @param key
     */
    getParam(key: string): any;
    /**
     * Return formatted parameters
     */
    getFormattedParams(): string;
    /**
     * Update parameters
     * @param parameters
     */
    updateParams(parameters?: object): this;
    /**
     * Check if key exists among parameters
     * @param key
     */
    keyParametersExists(key: string): boolean;
    /**
     * Remove an array of key(s) from parameters
     * @param {array} keysToRemove - array of key(s) to remove
     */
    removeParameters(keysToRemove: string[]): this;
    /**
     * Create or Remove an array of key(s) from parameters
     * @param {array} keysToToggle - array of key(s) to remove
     */
    toggleParameters(keysToToggle: string[]): this;
    /**
     * Set Query Parameters
     * @param {object} queryParameters - query params to update {key : value}
     */
    setParams(queryParameters?: object): this;
    /**
     * Format the querystring
     */
    private setFormattedParameters;
}
