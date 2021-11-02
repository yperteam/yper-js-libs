/// <reference types="jquery" />
/// <reference types="jquery.blockui" />
/// <reference types="jqueryui" />
/// <reference types="bootstrap" />
import { AbstractLib } from "../libs/abstract_lib";
export default class JourneyController extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem?: JQuery<HTMLElement> | null);
    /**
     * Get journey
     */
    getJourney(): Promise<any>;
    /**
     * Get missions journey
     */
    getMission(): Promise<any>;
    /**
     * Apply rain on journeys
     */
    postJourneyRain(): Promise<any>;
    /**
     * Delete Journey
     */
    deleteJourney(): Promise<any>;
    /**
     * Get journey Event
     */
    getJourneyEvents(): Promise<any>;
    /**
     * Add Ambassador
     */
    addAmbassador(): Promise<any>;
    /**
     * Remove Ambassador
     */
    removeAmbassador(): Promise<any>;
}
