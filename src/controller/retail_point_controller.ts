import {AbstractLib} from "../libs/abstract_lib";
import {ApiRetailPointUrlEnum} from "../enums/api_url_enum";

export default class RetailPointController extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor(
        $elem: JQuery<HTMLElement> | null = null
    ) {
        super();
        this.setLoader($elem);
    }

    /**
     * search retail point
     */
    public async search(): Promise<any> {
        return this._getPromise(ApiRetailPointUrlEnum.get_retail_point_search);
    }

    /**
     * Get RetailPoint
     */
    public async getRetailPoint(): Promise<any> {
        return this._getPromise(ApiRetailPointUrlEnum.e_root_retail_point);
    }
}