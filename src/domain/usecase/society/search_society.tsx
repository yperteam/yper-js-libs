import { SocietyRegistry } from "@yper-script/react/data/entity/society_registry.entity";
import { SocietyRepository } from "@yper-script/react/data/repository/society.repository";

export class SearchSocietyRegistry {
  private repository: SocietyRepository = new SocietyRepository();

  public async call(registryNumber: string): Promise<SocietyRegistry> {
    return this.repository.searchSocietyRegistry(registryNumber);
  }
}
