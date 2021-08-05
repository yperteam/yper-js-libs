import {AbstractLib} from "../libs/abstract_lib";
import {ApiRackUrlEnum} from "../enums/api_url_enum";

export default class RackController extends AbstractLib {

    /**
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
     * Get rack
     */
    public async getRack(): Promise<any> {
        return this._getPromise(ApiRackUrlEnum.e_root_rack);
    }

    /**
     * Get rack position
     */
    public async getRackPosition(): Promise<any> {
        return this._getPromise(ApiRackUrlEnum.e_root_rack_position);
    }

}