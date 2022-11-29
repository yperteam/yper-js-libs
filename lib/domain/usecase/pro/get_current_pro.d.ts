import { Pro } from "../../../data/entity/pro.entity";
export declare class GetCurrentPro {
    /** Repository */
    private proRepository;
    call(): Promise<Pro>;
}
