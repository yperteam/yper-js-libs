/// <reference types="googlemaps" />
/// <reference types="jquery" />
/// <reference types="jquery.blockui" />
/// <reference types="jqueryui" />
/// <reference types="bootstrap" />
import { GoogleAddressEntity } from "../entity/google_address_entity";
import Circle = google.maps.Circle;
export declare class AutocompletionAddressHelper {
    private googleAutocomplete;
    private onChangeCallback;
    private readonly inputSelector;
    private googleAddress;
    private readonly formInputs?;
    /** Required data */
    private readonly streetNb;
    private readonly route;
    private readonly locality;
    private readonly country;
    private readonly postalCode;
    /** Required data */
    private readonly currentRetailPoint;
    private readonly rpRadius;
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
    googleAutocompleteField(autocompleteValue?: string): void;
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
     * Get bounds
     */
    getPickUpBounds(): Promise<Circle | null>;
    /**
     * Bind the autocompletion to an input
     */
    bindAddressAutocomplete(): void;
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
