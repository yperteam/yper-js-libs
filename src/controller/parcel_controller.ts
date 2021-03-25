import {AbstractLib} from "../libs/abstract_lib";
import {ApiParcelUrlEnum} from "../enums/api_url_enum";

export default class ParcelController extends AbstractLib {

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
     * Refuse a unique parcel
     */
    public async refuseParcel(): Promise<any> {
        return this._postPromise(ApiParcelUrlEnum.endpoint_post_parcel_refuse);
    }
}