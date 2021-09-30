import { AbstractLib } from "../libs/abstract_lib";
import { ApiLegalDocsUrlEnum } from "../enums/api_url_enum";

export default class LegalDocumentController extends AbstractLib {
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
    public async deleteDocument(): Promise<any> {
        return this._deletePromise(ApiLegalDocsUrlEnum.e_root_legal_document);
    }
}