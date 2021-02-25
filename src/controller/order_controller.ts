import {AbstractLib} from "../libs/abstract_lib";
import {ApiOrderUrlEnum} from "../enums/api_url_enum";

export default class OrderController extends AbstractLib {
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
     * Create a new order corresponding to mission(s)
     */
    public async createOrder(): Promise<any> {
        return this._postPromise(ApiOrderUrlEnum.root_order);
    }

    /**
     * Add item(s) to the order
     */
    public async addItems(): Promise<any> {
        return this._postPromise(ApiOrderUrlEnum.e_root_order_add_items);
    }

    /**
     * Validate Order
     */
    public async validateOrder(): Promise<any> {
        return this._postPromise(ApiOrderUrlEnum.e_root_order_validate);
    }

    /**
     * Pay Order
     */
    public async payOrder(): Promise<any> {
        return this._postPromise(ApiOrderUrlEnum.e_root_order_pay);
    }
}