/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="datatables.net" />
/// <reference types="jquery.blockui" />
/// <reference types="jqueryui" />
/// <reference types="bootstrap" />
/// <reference types="select2" />
import { GoogleAddressEntity } from "../entity/google_address_entity";
export declare class AutocompletionAddressHelper {
    private readonly inputSelector;
    private googleAutocomplete;
    private onChangeCallback;
    private googleAddress;
    private readonly formInputs?;
    private impreciseAddress;
    /** Required data */
    private readonly streetNb;
    private readonly route;
    private readonly locality;
    private readonly country;
    private readonly postalCode;
    /**
     *
     * @param inputSelector
     * @param address
     * @param formInputsToBind: The form to bind the inputs, to actualize it
     */
    constructor(inputSelector: JQuery, address?: GoogleAddressEntity | null, formInputsToBind?: FormInputInterface);
    /**
     * Address getter
     */
    getGoogleAddress(): GoogleAddressEntity;
    /**
     * get address data
     */
    getFormattedData(): {
        formatted_address: string;
        street: string;
        street_number: number;
        zip: number;
        city: string;
        country: string;
        location: {
            type: string;
            coordinates: number[];
        };
    };
    /**
     * Address getter
     */
    getInputSelector(): JQuery<HTMLElement>;
    /**
     *
     * @param autocompleteValue
     * @private
     */
    private googleAutocompleteField;
    /**
     * Set a custom callback on OnChange event
     */
    setOnChangeCallback(callback: any): void;
    preventSubmitForm(): void;
    /**
     * Actualize address information on the form set
     */
    actualizeForm(): void;
    /**
     * Remove all form data
     */
    cleanFormData(): void;
    /**
     * Set default bounds
     */
    private setDefaultBounds;
    /**
     *
     * @param conf
     */
    setCustomBounds(conf: {
        center: {
            lat: number;
            lng: number;
        };
        radius: number;
    }): void;
    /**
     * Set to true if you do not need precise address (as example without street_number)
     * @param authorization
     */
    setImpreciseAddress(authorization: boolean): void;
    /**
     * Bind the autocompletion to an input
     */
    private bindAddressAutocomplete;
    private onPlaceChanged;
}
export interface FormInputInterface {
    lng: JQuery;
    lat: JQuery;
    streetNumber: JQuery;
    formattedAddress: JQuery;
    street: JQuery;
    country: JQuery;
    city: JQuery;
    zip?: JQuery;
}
