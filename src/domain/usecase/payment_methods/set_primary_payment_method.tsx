import { PaymentMethodRepository } from "../../../data/repository/payment_method.repository";
import { GetCurrentProId } from "../pro/get_current_pro_id";
import { firstValueFrom } from "rxjs";

export class SetPrimaryPaymentMethod {
  private repository: PaymentMethodRepository = new PaymentMethodRepository();
  private getCurrentProId: GetCurrentProId = new GetCurrentProId();

  public async call(methodId: string): Promise<void> {
    return this.repository.setPrimary(
      await firstValueFrom(this.getCurrentProId()),
      methodId
    );
  }
}