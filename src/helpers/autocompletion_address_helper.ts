import {isDef, isIEbrowser, isSet} from "@yper-script/helpers/generic_helper";
import {GoogleMapError} from "@yper-script/error/YperException";
import {GoogleAddress} from "@yper-script/entity/google_address_entity";

export class AutocompletionAddressHelper {
    private googleAutocomplete: google.maps.places.Autocomplete;
    private onChangeCallback: Function | null = null;
    private readonly inputSelector: JQuery;
    private googleAddress: GoogleAddress = new GoogleAddress({
        formattedAddress: null,
        street: null,
        streetNumber: null,
        city: null,
        country: null,
        zip: null,
        lng: null,
        lat: null,
    });
    private readonly formInputs?: FormInputInterface;

    /**
     *
     * @param inputSelector
     * @param address
     * @param formInputsToBind: The form to bind the inputs, to actualize it
     */
    constructor(
        inputSelector: JQuery,
        address: GoogleAddress | null = null,
        formInputsToBind: FormInputInterface = null
    ) {
        this.inputSelector = inputSelector;
        if (address !== null) this.googleAddress = address;
        this.formInputs = formInputsToBind;
    }

    /**
     * Address getter
     */
    public getGoogleAddress() {
        return this.googleAddress;
    }

    /**
     * get address data
     */
    public getFormattedData() {
        return this.googleAddress.getFormattedData();
    }

    /**
     * Address getter
     */
    public getInputSelector() {
        return this.inputSelector;
    }

    /**
     * Bind the autocompletion to an input
     */
    public bindAddressAutocomplete() {
        let input = <HTMLInputElement>this.inputSelector.get(0);

        this.googleAutocomplete = new google.maps.places.Autocomplete(input, {
            componentRestrictions: {country: ["fr", "be", "de", "lu"]},
        });

        google.maps.event.addListener(
            this.googleAutocomplete,
            "place_changed",
            () => {
                this.onPlaceChanged();
            }
        );
    }

    private onPlaceChanged() {
        let place = this.googleAutocomplete.getPlace();
        let isStreetnumber = false;
        let streetNumber = null;
        let street = null;
        let city = null;
        let country = null;
        let zip = null;

        place.types.forEach(type => {
            if (type === "street_address" || type === "premise") {
                isStreetnumber = true;
            }
        });

        // TODO: devons-nous restreindres s'il n'y a pas de nom de rue ?
        if (!isStreetnumber || !place.geometry) {
            if (this.onChangeCallback instanceof Function) {
                const gError = new GoogleMapError(
                    "Missing street number or geometry place",
                    "missing_parameters",
                    400
                );
                return this.onChangeCallback(gError);
            }
        }

        for (let i in place.address_components) {
            let component = place.address_components[i];

            for (let j in component.types) {
                let typeElement = <HTMLInputElement>(
                    document.getElementById(component.types[j])
                );
                if (component.types[j] === "street_number") {
                    streetNumber = component.long_name;
                } else if (component.types[j] === "route") {
                    street = component.long_name;
                } else if (component.types[j] === "locality") {
                    city = component.long_name;
                } else if (component.types[j] === "country") {
                    country = component.long_name;
                } else if (component.types[j] === "postal_code") {
                    zip = component.long_name;
                }
                if (typeElement) {
                    typeElement.value = component.long_name;
                }
            }
        }

        this.googleAddress = new GoogleAddress({
            formattedAddress: place.formatted_address,
            street: street,
            // @ts-ignore
            streetNumber: streetNumber,
            city: city,
            country: country,
            // @ts-ignore
            zip: zip,
            lng: place.geometry.location.lng(),
            lat: place.geometry.location.lat(),
        });

        if (this.onChangeCallback instanceof Function) {
            return this.onChangeCallback(this.googleAddress);
        }
    }

    public googleAutocompleteField(autocompleteValue?: string) {
        let autocompleteInput = this.inputSelector.get(0);
        let observerHack = new MutationObserver(() => {
            observerHack.disconnect();
            if (!isDef(autocompleteValue) && !isIEbrowser()) {
                autocompleteValue = "new-password";
            } else if (!isDef(autocompleteValue) && isIEbrowser()) {
                autocompleteValue = "off";
            }
            this.inputSelector.attr("autocomplete", autocompleteValue);
        });
        observerHack.observe(autocompleteInput, {
            attributes: true,
            attributeFilter: ["autocomplete"],
        });
    }

    /**
     * Set a custom callback on OnChange event
     */
    public setOnChangeCallback(callback: any) {
        this.onChangeCallback = callback;
    }

    public preventSubmitForm() {
        this.inputSelector.on("keypress", event => {
            if (event.which === 13) {
                return false;
            }
        });
    }

    /**
     * Actualize address information on the form set
     */
    public actualizeForm() {
        for (let [key, value] of Object.entries(this.googleAddress)) {
            // @ts-ignore
            if (isSet(this.formInputs[key])) {
                // @ts-ignore
                this.formInputs[key].val(value);
            }
        }
    }

    /**
     * Remove all form data
     */
    public cleanFormData() {
        this.googleAddress.cleanData();
    }
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
