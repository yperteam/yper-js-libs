import { GetCurrentProId } from "../pro/get_current_pro_id";
import { ProRepository } from "../../../data/repository/pro.repository";
import { Invoice } from "../../../data/entity/invoice.entity";
import { PaginatedResult } from "../../../data/provider/http/paginated_result";
import { firstValueFrom } from "rxjs";

export class GetProInvoice {
  /** Repository */
  private proRepository: ProRepository = new ProRepository();

  /** UseCase */
  private getCurrentProId: GetCurrentProId = new GetCurrentProId();

  public async call(
    startDate: Date,
    endDate: Date
  ): Promise<PaginatedResult<Invoice>> {
    return this.proRepository.getInvoices(
      await firstValueFrom(this.getCurrentProId()),
      startDate,
      endDate
    );
  }
}
