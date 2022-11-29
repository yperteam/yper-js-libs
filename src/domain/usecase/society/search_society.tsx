import { SocietyRegistry } from "../../../data/entity/society_registry.entity";
import { SocietyRepository } from "../../../data/repository/society.repository";

export class SearchSocietyRegistry {
  private repository: SocietyRepository = new SocietyRepository();

  public async call(registryNumber: string): Promise<SocietyRegistry> {
    return this.repository.searchSocietyRegistry(registryNumber);
  }
}
