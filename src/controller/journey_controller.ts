import {AbstractLib} from "../libs/abstract_lib";
import {ApiJourneyUrlEnum} from "../enums/api_url_enum";

export default class JourneyController extends AbstractLib {
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
     * Get journey
     */
    public async getJourney(): Promise<any> {
        return this._getPromise(ApiJourneyUrlEnum.e_root_journey);
    }

    /**
     * Get missions journey
     */
    public async getMission(): Promise<any> {
        return this._getPromise(ApiJourneyUrlEnum.endpoint_post_parcel_refuse);
    }

    /**
     * Apply rain on journeys
     */
    public async postJourneyRain(): Promise<any> {
        return this._postPromise(ApiJourneyUrlEnum.endpoint_post_rain);
    }

    /**
     * Delete Journey
     */
    public async deleteJourney(): Promise<any> {
        return this._deletePromise(ApiJourneyUrlEnum.e_root_journey);
    }

    /**
     * Get journey Event
     */
    public async getJourneyEvents(): Promise<any> {
        return this._getPromise(ApiJourneyUrlEnum.endpoint_get_journey_events);
    }

    /**
     * Add Ambassador
     */
    public async addAmbassador(): Promise<any> {
        return this._postPromise(ApiJourneyUrlEnum.e_root_ambassador);
    }

    /**
     * Remove Ambassador
     */
    public async removeAmbassador(): Promise<any> {
        return this._deletePromise(ApiJourneyUrlEnum.root_ambassador);
    }
}