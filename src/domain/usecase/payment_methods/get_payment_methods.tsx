import { PaymentMethod } from "../../../data/entity/payment_method.entity";
import { PaymentMethodRepository } from "../../../data/repository/payment_method.repository";
import { GetCurrentProId } from "../pro/get_current_pro_id";
import { Observable, switchMap } from "rxjs";
import CallableInstance from "callable-instance";

export class GetPaymentMethods extends CallableInstance<
  [],
  Observable<PaymentMethod[]>
> {
  private repository: PaymentMethodRepository = new PaymentMethodRepository();
  private getCurrentProId: GetCurrentProId = new GetCurrentProId();

  constructor() {
    super("instanceMethod");
  }

  public instanceMethod(): Observable<PaymentMethod[]> {
    return this.getCurrentProId().pipe(
      switchMap(id => {
        return this.repository.getPaymentMethods(id);
      })
    );
  }

  public call(paymentType: string): Observable<PaymentMethod[]> {
    return this.getCurrentProId().pipe(
      switchMap(id => {
        return this.repository.getPaymentMethods(id, paymentType);
      })
    );
  }
}
