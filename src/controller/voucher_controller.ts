import { AbstractLib } from "../libs/abstract_lib";
import { ApiVoucherUrlEnum } from "../enums/api_url_enum";

export default class VoucherController extends AbstractLib {
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
     * Create a Voucher
     */
    public async create(): Promise<any> {
        return this._postPromise(ApiVoucherUrlEnum.root_voucher);
    }

    /**
     * Update a Voucher
     */
    public async update(): Promise<any> {
        return this._patchPromise(ApiVoucherUrlEnum.e_root_voucher);
    }

    /**
     * Get a Voucher
     */
    public async get(): Promise<any> {
        return this._getPromise(ApiVoucherUrlEnum.e_root_voucher);
    }

    /**
     * Deactivate a Voucher
     */
    public async deactivate(): Promise<any> {
        return this._postPromise(ApiVoucherUrlEnum.endpoint_post_deactivate);
    }
}