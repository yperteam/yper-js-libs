import {AbstractLib} from "@yper-script/libs/abstract_lib";
import {ApiUrlEnum} from "@yper-script/enums/api_url_enum";

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
    public async search() {
        return this._getPromise(ApiUrlEnum.retailPointSearch);
    }
}