import { Invoice } from "../../../data/entity/invoice.entity";
import { PaginatedResult } from "../../../data/provider/http/paginated_result";
export declare class GetProInvoice {
    /** Repository */
    private proRepository;
    /** UseCase */
    private getCurrentProId;
    call(startDate: Date, endDate: Date): Promise<PaginatedResult<Invoice>>;
}
