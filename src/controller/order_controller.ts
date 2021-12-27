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
     * Add item(s) to the order
     */
    public async addItems(): Promise<any> {
        return this._postPromise(ApiOrderUrlEnum.e_root_order_add_items);
    }

    /**
     * Create a new order corresponding to mission(s)
     */
    public async createOrder(): Promise<any> {
        return this._postPromise(ApiOrderUrlEnum.root_order);
    }

    /**
     * Get an order
     */
    public async getOrder(): Promise<any> {
        return this._getPromise(ApiOrderUrlEnum.e_root_order);
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

    /**
     * Apply Voucher on Order
     */
    public async applyVoucher(): Promise<any> {
        return this._postPromise(ApiOrderUrlEnum.e_root_order_voucher);
    }

    /**
     * Delete Voucher from Order
     */
    public async deleteVoucher(): Promise<any> {
        return this._deletePromise(ApiOrderUrlEnum.e_root_order_voucher);
    }
}