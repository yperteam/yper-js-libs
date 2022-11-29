import { atomFamily, Loadable } from "recoil";
import { GetOrder } from "../../../domain/usecase/order/get_order";
import { Order } from "../../../data/entity/order.entity";
import { CustomLoadable } from "../custom_loadable";

export class OrderNotifier {
  static provider = atomFamily<Loadable<Order>, string>({
    key: "current_order",
    default: id =>
      CustomLoadable.guard(async () => {
        return new GetOrder().call(id);
      }),
  });
}
