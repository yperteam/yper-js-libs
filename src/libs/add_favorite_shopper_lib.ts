import { AbstractLib } from "../libs/abstract_lib";
import { UrlAjax } from "../enums/GenericEnums";

/**
 * AddFavoriteShopperLib object
 */
export default class AddFavoriteShopperLib extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem: JQuery<HTMLElement> | null = null) {
        super();
        this.setLoader($elem);
    }

    /**
     * add a new favorite shopper function
     */
    public async addFavoriteShopper() {
        return this._postPromise(UrlAjax.postAddFavoriteShopper);
    }
}
