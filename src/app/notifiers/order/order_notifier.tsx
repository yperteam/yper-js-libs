import { atomFamily, Loadable } from "recoil";
import { CustomLoadable } from "../../../app/notifiers/custom_loadable";
import { Order } from "../../../data/entity/order.entity";
import { GetOrder } from "../../../domain/usecase/get_order";

export class OrderNotifier {
  static provider = atomFamily<Loadable<Order>, string>({
    key: "current_order",
    default: id =>
      CustomLoadable.guard(async () => {
        return new GetOrder().call(id);
      }),
  });
}
