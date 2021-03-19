import {AbstractLib} from "../libs/abstract_lib";
import {ApiUserUrlEnum} from "../enums/api_url_enum";

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
     * Subscribe user - Need to define your own route
     */
    public async subscribe(path: string): Promise<any> {
        return this._postPromise(path);
    }
}