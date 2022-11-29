import { Observable } from "rxjs";
import { MissionTemplate } from "../entity/mission_template.entity";
export declare class RetailpointRepository {
    private api;
    getCurrentRetailpointId(): Observable<string>;
    getMissionTemplates(proId: string, rpId: string): Promise<MissionTemplate[]>;
}
