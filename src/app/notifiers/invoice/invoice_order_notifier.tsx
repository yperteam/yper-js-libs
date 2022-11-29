import { atom, Loadable, SetterOrUpdater } from "recoil";
import { CustomLoadable } from "../custom_loadable";
import { OrderInvoices } from "../../../domain/usecase/invoice/order_invoices";
import { Order } from "../../../data/entity/order.entity";

const redirectEffect = key => ({ onSet }) => {
  onSet(newValue => {
    if (newValue?.state === "hasValue") {
      // TODO remove this when we create the react page
      window.location.pathname = "/order/pay/" + newValue.contents.id;
    }
  });
};

export class InvoiceOrderNotifier {
  static provider = atom<Loadable<Order>>({
    key: "invoice-order-provider",
    default: null,
    effects_UNSTABLE: [redirectEffect("order_effect")],
  });

  static notifier = async (ids: string[], set: SetterOrUpdater<any>) => {
    set(CustomLoadable.loading);
    set(await CustomLoadable.guard(() => new OrderInvoices().call(ids)));
  };
}
