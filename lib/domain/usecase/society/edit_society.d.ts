import { Society } from "../../../data/entity/society.entity";
import { SocietyRequestParams } from "../../../data/repository/society.repository";
export declare class EditSociety {
    private proRepository;
    private societyRepository;
    call(society: SocietyRequestParams): Promise<Society>;
}
