import {AbstractLib} from "../libs/abstract_lib";
import {ApiHubUrlEnum} from "../enums/api_url_enum";

export default class HubController extends AbstractLib {
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
     * Apply rain on journeys' hub
     */
    public async postJourneyRain(): Promise<any> {
        return this._postPromise(ApiHubUrlEnum.endpoint_post_journey_rain);
    }

    /**
     * Generate Journey for a Hub
     */
    public async generateJourney(): Promise<any> {
        return this._postPromise(ApiHubUrlEnum.endpoint_generate_journey);
    }
}