import { CurrentRetailPointStorage } from "../provider/local/current_retailpoint_storage";
import { Observable } from "rxjs";
import { Api } from "../provider/http/api";
import { MissionTemplate } from "../entity/mission_template.entity";

export class RetailpointRepository {
  private api = new Api();

  public getCurrentRetailpointId(): Observable<string> {
    return CurrentRetailPointStorage.instance.get();
  }

  public async getMissionTemplates(
    proId: string,
    rpId: string
  ): Promise<MissionTemplate[]> {
    return this.api.getRetailPointMissionTemplates(proId, rpId);
  }
}
