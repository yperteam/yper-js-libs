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
export declare class GoogleAddressEntity {
    formattedAddress?: string;
    lng?: number;
    lat?: number;
    streetNumber?: number;
    street?: string;
    country?: string;
    city?: string;
    zip?: number;
    constructor(googleAddress: GoogleAddressInfo);
    /**
     * Is instance is complete, minimum take in account only the formatted address, the lat and the lng
     * @param {boolean} minimum
     */
    isComplete(minimum?: boolean): boolean;
    /**
     * Remove all address data
     */
    cleanData(): this;
    /**
     * get address data
     *
     * @return AddressEntity
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
}
export {};
