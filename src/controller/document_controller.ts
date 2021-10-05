import { AbstractLib } from "../libs/abstract_lib";
import { ApiDocumentUrlEnum } from "../enums/api_url_enum";

export default class DocumentController extends AbstractLib {
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
     * Delete Document
     */
    public async delete(): Promise<any> {
        return this._deletePromise(ApiDocumentUrlEnum.e_root_document);
    }
}