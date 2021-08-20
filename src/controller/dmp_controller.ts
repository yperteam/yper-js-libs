import { AbstractLib } from "../libs/abstract_lib";
import { ApiDmpUrlEnum } from "../enums/api_url_enum";

export default class DMPController extends AbstractLib {
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
     * Get Availability Color
     */
    public async getAvailabilityColor(): Promise<any> {
        return this._getPromise(ApiDmpUrlEnum.availability_color);
    }
}