import {AbstractLib} from "../libs/abstract_lib";
import {ApiUserPaymentMethodUrlEnum} from "../enums/api_url_enum";

export default class UserPaymentMethodController extends AbstractLib {
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
     * List all payment method(s)
     */
    public async list(): Promise<any> {
        return this._getPromise(ApiUserPaymentMethodUrlEnum.root_user_payment_method);
    }

    /**
     * List all payment method(s)
     */
    public async getPaymentMethod(): Promise<any> {
        return this._getPromise(ApiUserPaymentMethodUrlEnum.e_root_user_payment_method);
    }

    /**
     * Delete Payment Method
     */
    public async deletePaymentMethod(): Promise<any> {
        return this._deletePromise(ApiUserPaymentMethodUrlEnum.e_root_user_payment_method);
    }

    /**
     * Set a payment method as primary
     */
    public async primary(): Promise<any> {
        return this._postPromise(ApiUserPaymentMethodUrlEnum.user_payment_method_primary);
    }
}