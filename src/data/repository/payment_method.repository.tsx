import { Api, ClientDetails } from "@yper-script/react/data/provider/http/api";
import { PaymentMethod } from "@yper-script/react/data/entity/payment_method.entity";
import { Observable, from, mergeMap, firstValueFrom } from "rxjs";
import { PaymentMethodStorage } from "@yper-script/react/data/provider/local/payment_method_storage";

export class PaymentMethodRepository {
  private api = new Api();

  public getPaymentMethods(
    proId: string,
    paymentType?: string
  ): Observable<PaymentMethod[]> {
    return from(this.api.getProPaymentMethods(proId, paymentType)).pipe(
      mergeMap(list => {
        PaymentMethodStorage.instance.set(list);
        return PaymentMethodStorage.instance.get();
      })
    );
  }

  public async setPrimary(proId: string, methodId: string) {
    await this.api.setPrimaryPaymentMethod(proId, methodId);
    let methods = await firstValueFrom(PaymentMethodStorage.instance.get());
    const i1 = methods.findIndex(m => m.primary);
    const i2 = methods.findIndex(m => m.id == methodId);
    let method1 = Object.assign({}, methods[i1]);
    method1.primary = false;
    let method2 = Object.assign({}, methods[i2]);
    method2.primary = true;
    PaymentMethodStorage.instance.set(
      methods.map((m, i) => {
        if (i == i1) {
          return method1;
        } else if (i == i2) {
          return method2;
        }
        return m;
      })
    );
  }

  public async delete(proId: string, methodId: string) {
    await this.api.deletePaymentMethod(proId, methodId);
    let methods = await firstValueFrom(PaymentMethodStorage.instance.get());
    let method = methods.find(m => m.id == methodId);
    PaymentMethodStorage.instance.set(
      methods
        .filter(m => m.id != methodId)
        .map((m, i) => {
          if (i == 0 && method.primary) {
            let firstMethod = Object.assign({}, m);
            firstMethod.primary = true;
            return firstMethod;
          }
          return m;
        })
    );
  }

  public addProCard(proId: string): Promise<ClientDetails> {
    return this.api.addProCard(proId);
  }

  public addProIban(proId: string): Promise<ClientDetails> {
    return this.api.addProIban(proId);
  }
}
