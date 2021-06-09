import {AbstractLib} from "../libs/abstract_lib";
import {ApiTargetEnum} from "../enums/api_url_enum";

/**
 * UserController
 */
export default class TargetController extends AbstractLib {
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
     * Get all Targets
     */
    public async getTargets(): Promise<any> {
        return this._getPromise(ApiTargetEnum.root_target);
    }

    /**
     * Get target Category
     */
    public async getTargetCategory(): Promise<any> {
        return this._getPromise(ApiTargetEnum.target_category);
    }

    /**
     * Get Target
     */
    public async getTarget(): Promise<any> {
        return this._getPromise(ApiTargetEnum.e_root_target);
    }

    /**
     * Execute Target
     */
    public async executeTarget(): Promise<any> {
        return this._postPromise(ApiTargetEnum.e_root_target_execute);
    }

    /**
     * Preview Target
     */
    public async previewTarget(): Promise<any> {
        return this._getPromise(ApiTargetEnum.e_root_target_preview);
    }
}