import {AbstractLib} from "../libs/abstract_lib";
import {ApiInvoiceUrlEnum} from "../enums/api_url_enum";

export default class InvoiceController extends AbstractLib {
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
     * Update an invoice
     */
    public async invoiceUpdate(): Promise<any> {
        return this._putPromise(ApiInvoiceUrlEnum.e_root_invoice);
    }

    /**
     * Create an item
     */
    public async itemCreate(): Promise<any> {
        return this._postPromise(ApiInvoiceUrlEnum.root_item);
    }
    
    /**
     * Update an item
     */
    public async itemUpdate(): Promise<any> {
        return this._putPromise(ApiInvoiceUrlEnum.e_root_item);
    }

    /**
     * Delete an item
     */
    public async itemDelete(): Promise<any> {
        return this._deletePromise(ApiInvoiceUrlEnum.e_root_item);
    }
}