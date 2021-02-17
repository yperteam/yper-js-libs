import {
    isDef,
    isIEbrowser,
    isSet, get
} from "./generic_helper";
import {GoogleMapError} from "../error/yper_exception";
import {GoogleAddressEntity} from "../entity/google_address_entity";
import Circle = google.maps.Circle;

export class AutocompletionAddressHelper {
    private googleAutocomplete: google.maps.places.Autocomplete;
    private onChangeCallback: Function | null = null;
    private readonly inputSelector: JQuery;
    private googleAddress: GoogleAddressEntity = new GoogleAddressEntity({
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

    /** Required data */
    private readonly streetNb = "street_number";
    private readonly route = "route";
    private readonly locality = "locality";
    private readonly country = "country";
    private readonly postalCode = "postal_code";

    /**
     *
     * @param inputSelector
     * @param address
     * @param formInputsToBind: The form to bind the inputs, to actualize it
     */
    constructor(
        inputSelector: JQuery,
        address: GoogleAddressEntity | null = null,
        formInputsToBind: FormInputInterface = null
    ) {
        this.inputSelector = inputSelector;
        if (address !== null) this.googleAddress = address;
        this.formInputs = formInputsToBind;
        this.bindAddressAutocomplete();
        this.googleAutocompleteField();
        this.setDefaultBounds();
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
     *
     * @param autocompleteValue
     * @private
     */
    private googleAutocompleteField(autocompleteValue?: string) {
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

    /**
     * Set default bounds
     */
    private setDefaultBounds() {
        let geolocation: {
            lat: number;
            lng: number;
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    geolocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    this.setCustomBounds({
                        center: geolocation,
                        radius: position.coords.accuracy,
                    });
                },
                err => {
                    console.log(err);
                }
            );
        }
    }

    /**
     *
     * @param conf
     */
    public setCustomBounds(conf: { center: { lat: number, lng: number }, radius: number }) {
        const googleBounds: google.maps.Circle = new google.maps.Circle({
            center: conf.center,
            radius: conf.radius,
        });

        this.googleAutocomplete.setBounds(
            googleBounds.getBounds()
        );
    }

    /**
     * Bind the autocompletion to an input
     */
    private bindAddressAutocomplete() {
        let input = <HTMLInputElement>this.inputSelector.get(0);

        this.googleAutocomplete = new google.maps.places.Autocomplete(input, {
            componentRestrictions: {country: ["fr", "be", "de", "lu"]},
            fields: ["address_component", "formatted_address", "geometry"],
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
        let isStreetNumber: boolean = false;
        let streetNumber = null;
        let street = null;
        let city = null;
        let country = null;
        let zip = null;

        place.address_components.map(addressComponent => {
            addressComponent.types.map(addrCmpType => {
                let typeElement = <HTMLInputElement>(
                    document.getElementById(addrCmpType)
                );
                if (addrCmpType === this.streetNb) {
                    isStreetNumber = true;
                    streetNumber = addressComponent.long_name;
                } else if (addrCmpType === this.route) {
                    street = addressComponent.long_name;
                } else if (addrCmpType === this.locality) {
                    city = addressComponent.long_name;
                } else if (addrCmpType === this.country) {
                    country = addressComponent.long_name;
                } else if (addrCmpType === this.postalCode) {
                    zip = addressComponent.long_name;
                }
                if (typeElement) {
                    typeElement.value = addressComponent.long_name;
                }
            });
        });

        // TODO: devons-nous restreindres s'il n'y a pas de nom de rue ?
        if (!isStreetNumber || !place.geometry) {
            if (this.onChangeCallback instanceof Function) {
                const gError = new GoogleMapError(
                    "Missing street number or geometry place",
                    "missing_parameters",
                    400
                );
                return this.onChangeCallback(gError);
            }
        }

        this.googleAddress = new GoogleAddressEntity({
            formattedAddress: place.formatted_address,
            street: street,
            streetNumber: streetNumber,
            city: city,
            country: country,
            zip: zip,
            lng: place.geometry.location.lng(),
            lat: place.geometry.location.lat(),
        });

        if (this.onChangeCallback instanceof Function) {
            return this.onChangeCallback(this.googleAddress);
        }
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
