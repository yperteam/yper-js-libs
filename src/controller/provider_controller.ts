import {AbstractLib} from "../libs/abstract_lib";
import {ApiProviderUrlEnum} from "../enums/api_url_enum";

export default class ProviderController extends AbstractLib {
    /**
     *
     * @constructor
     * @param $elem
     */
    constructor(
        $elem: JQuery<HTMLElement> | null = null
    ) {
        super();
        this.setLoader($elem);
    }

    /**
     * Get provider list
     */
    public async getProviderList(): Promise<any> {
        return this._getPromise(ApiProviderUrlEnum.root_provider);
    }

    /**
     * Get provider stats
     */
    public async getProviderStats(): Promise<any> {
        return this._getPromise(ApiProviderUrlEnum.e_root_provider_stats);
    }

    /**
     * Get provider hub stats
     */
    public async getProviderHubStats(): Promise<any> {
        return this._getPromise(ApiProviderUrlEnum.e_root_provider_hub_stats);
    }

}