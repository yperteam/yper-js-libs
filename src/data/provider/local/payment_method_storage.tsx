import { PaymentMethod } from "../../entity/payment_method.entity";
import { ObservableStorage } from "./observable_storage";

export class PaymentMethodStorage extends ObservableStorage<PaymentMethod[]> {
  constructor() {
    super([]);
  }

  public byId(id: string): PaymentMethod | undefined {
    return this.subject.value.find(m => m.id === id);
  }

  public remove(id: string) {
    this.subject.next(this.subject.value.filter(m => m.id != id));
  }

  static instance = new PaymentMethodStorage();
}
