import { Address } from "../entity/address.entity";
import { Society } from "../entity/society.entity";
import { SocietyRegistry } from "../entity/society_registry.entity";
import { Api } from "../provider/http/api";

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

export class SocietyRepository {
  private api = new Api();

  public searchSocietyRegistry(
    registryNumber: string
  ): Promise<SocietyRegistry> {
    return this.api.searchSocietyRegistry(registryNumber);
  }

  public editSociety(
    societyId: string,
    params: SocietyRequestParams
  ): Promise<Society> {
    return this.api.putSociety(societyId, params);
  }
}
