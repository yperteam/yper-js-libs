import { CurrentRetailPointStorage } from "@yper-script/react/data/provider/local/current_retailpoint_storage";
import { Observable } from "rxjs";
import { Api } from "@yper-script/react/data/provider/http/api";
import { MissionTemplate } from "@yper-script/react/data/entity/mission_template.entity";

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
