import { Address } from "./address.entity";
export interface SocietyRegistry {
    brand: string;
    name: string;
    activityType: string;
    siren: string;
    address: Address;
    phone?: string;
}
