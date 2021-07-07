import {AbstractLib} from "../libs/abstract_lib";
import {ApiProUrlEnum} from "../enums/api_url_enum";

export default class ProController extends AbstractLib {
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
     * Get pro infos
     */
    public async getPro(): Promise<any> {
        return this._getPromise(ApiProUrlEnum.e_root_pro);
    }
}