import { ProLimit } from "../../../data/entity/pro_limit.entity";
export declare class GetProLimit {
    /** Repository */
    private proRepository;
    /** UseCase */
    private getCurrentProId;
    call(): Promise<ProLimit>;
}
