/// <reference types="jquery" />
/// <reference types="jquery.blockui" />
/// <reference types="jqueryui" />
/// <reference types="bootstrap" />
import { AbstractLib } from "../libs/abstract_lib";
export default class HubController extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem?: JQuery<HTMLElement> | null);
    /**
     * Apply rain on journeys' hub
     */
    postJourneyRain(): Promise<any>;
    /**
     * Generate Journey for a Hub
     */
    generateJourney(): Promise<any>;
}
