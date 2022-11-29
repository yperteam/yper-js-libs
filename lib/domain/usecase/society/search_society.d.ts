import { SocietyRegistry } from "../../../data/entity/society_registry.entity";
export declare class SearchSocietyRegistry {
    private repository;
    call(registryNumber: string): Promise<SocietyRegistry>;
}
