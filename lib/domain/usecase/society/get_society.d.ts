import { Society } from "../../../data/entity/society.entity";
import { Observable } from "rxjs";
export declare class GetSociety {
    private repository;
    private getCurrentProId;
    call(): Observable<Society>;
}
