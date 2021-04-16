import {AbstractLib} from "../libs/abstract_lib";
import {ApiSearchUrlEnum} from "../enums/api_url_enum";

/**
 * UserController
 */
export default class UserController extends AbstractLib {
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
     * Search
     */
    public async searchRetailPoint(): Promise<any> {
        return this._getPromise(ApiSearchUrlEnum.e_root_search_retail_point);
    }
}