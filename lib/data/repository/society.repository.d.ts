import { Address } from "../entity/address.entity";
import { Society } from "../entity/society.entity";
import { SocietyRegistry } from "../entity/society_registry.entity";
export interface SocietyRequestParams {
    name: string;
    activityType: string;
    identificationNumber: string;
    address?: Address;
    ownerFirstname: string;
    ownerLastname: string;
    ownerPhone: string;
    ownerEmail?: string;
}
export declare class SocietyRepository {
    private api;
    searchSocietyRegistry(registryNumber: string): Promise<SocietyRegistry>;
    editSociety(societyId: string, params: SocietyRequestParams): Promise<Society>;
}
