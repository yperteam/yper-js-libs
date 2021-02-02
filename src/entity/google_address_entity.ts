import { isSet } from "@yper-script/helpers/generic_helper";

interface GoogleAddressInfo {
    formattedAddress?: string;
    lng?: number;
    lat?: number;
    streetNumber?: number;
    street?: string;
    country?: string;
    city?: string;
    zip?: number;
}

export class GoogleAddress {
    public formattedAddress?: string;
    public lng?: number;
    public lat?: number;
    public streetNumber?: number;
    public street?: string;
    public country?: string;
    public city?: string;
    public zip?: number;

    constructor(googleAddress: GoogleAddressInfo) {
        this.formattedAddress = googleAddress.formattedAddress;
        this.lng = googleAddress.lng;
        this.lat = googleAddress.lat;
        this.streetNumber = googleAddress.streetNumber;
        this.street = googleAddress.street;
        this.country = googleAddress.country;
        this.city = googleAddress.city;
        this.zip = googleAddress.zip;
    }

    /**
     * Is instance is complete, minimum take in account only the formatted address, the lat and the lng
     * @param {boolean} minimum
     */
    public isComplete(minimum: boolean = false) {
        if (minimum) {
            return (
                isSet(this.formattedAddress) &&
                isSet(this.lat) &&
                isSet(this.lng)
            );
        }

        for (let [key, attr] of Object.entries(this)) {
            if (!isSet(attr)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Remove all address data
     */
    public cleanData() {
        this.formattedAddress = null;
        this.lng = null;
        this.lat = null;
        this.streetNumber = null;
        this.street = null;
        this.country = null;
        this.city = null;
        this.zip = null;

        return this;
    }

    /**
     * get address data
     *
     * @return AddressEntity
     */
    public getFormattedData() {
        return {
            formatted_address: this.formattedAddress,
            street: this.street,
            street_number: this.streetNumber,
            zip: this.zip,
            city: this.city,
            country: this.country,
            location: {
                type: "Point",
                coordinates: [this.lng, this.lat],
            },
        };
    }
}
