import { UrlAjax } from "@yper-script/enums/GenericEnums";
import { AbstractLib } from "@yper-script/libs/abstract_lib";

/**
 * GenerateJourneyLib object
 */
export default class GenerateJourneyLib extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem: JQuery<HTMLElement> | null = null) {
        super();
        this.setLoader($elem);
    }

    public async generateJourney() {
        return this._postPromise(UrlAjax.postGenerateJourney);
    }
}
