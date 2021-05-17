import {AbstractLib} from "../libs/abstract_lib";
import {ApiJourneyUrlEnum} from "../enums/api_url_enum";

export default class JourneyController extends AbstractLib {
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
     * Get missions' journey
     */
    public async getMission(): Promise<any> {
        return this._getPromise(ApiJourneyUrlEnum.endpoint_post_parcel_refuse);
    }
}