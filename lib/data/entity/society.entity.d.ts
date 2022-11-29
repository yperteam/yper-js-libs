import { Address } from "./address.entity";
export interface Society {
    id: string;
    activityTypeId: string;
    address: Address;
    identificationNumber: string;
    name: string;
    owner: Owner;
    tvaNumber?: string;
}
export interface Owner {
    email: string;
    firstName: string;
    lastName: string;
    phone: {
        number: string;
        verified: boolean;
    };
}
