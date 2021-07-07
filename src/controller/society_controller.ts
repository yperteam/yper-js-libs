import {AbstractLib} from "../libs/abstract_lib";
import {ApiSocietyUrlEnum} from "../enums/api_url_enum";

export default class SocietyController extends AbstractLib {
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
     * Get society infos
     */
    public async getSociety(): Promise<any> {
        return this._getPromise(ApiSocietyUrlEnum.e_root_society);
    }
}