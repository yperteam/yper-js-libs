import { ClientDetails } from "../../../data/provider/http/api";
import { PaymentMethodRepository } from "../../../data/repository/payment_method.repository";
import { GetCurrentProId } from "../../../domain/usecase/pro/get_current_pro_id";
import { firstValueFrom, filter } from "rxjs";

export class AddProCard {
  private repository: PaymentMethodRepository = new PaymentMethodRepository();
  private getCurrentProId: GetCurrentProId = new GetCurrentProId();

  public async call(): Promise<ClientDetails> {
    return this.repository.addProCard(
      await firstValueFrom(this.getCurrentProId().pipe(filter(s => s != null)))
    );
  }
}