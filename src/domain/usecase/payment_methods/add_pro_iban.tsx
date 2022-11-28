import { firstValueFrom, filter } from "rxjs";
import { ClientDetails } from "@yper-script/react/data/provider/http/api";
import { PaymentMethodRepository } from "@yper-script/react/data/repository/payment_method.repository";
import { GetCurrentProId } from "@yper-script/react/domain/usecase/get_current_pro_id";

export class AddProIban {
  private repository: PaymentMethodRepository = new PaymentMethodRepository();
  private getCurrentProId: GetCurrentProId = new GetCurrentProId();

  public async call(): Promise<ClientDetails> {
    return this.repository.addProIban(
      await firstValueFrom(this.getCurrentProId().pipe(filter(s => s != null)))
    );
  }
}
