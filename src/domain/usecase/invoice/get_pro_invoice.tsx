import { GetCurrentProId } from "@yper-script/react/domain/usecase/get_current_pro_id";
import { ProRepository } from "@yper-script/react/data/repository/pro.repository";
import { Invoice } from "@yper-script/react/data/entity/invoice.entity";
import { PaginatedResult } from "@yper-script/react/data/provider/http/paginated_result";
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
