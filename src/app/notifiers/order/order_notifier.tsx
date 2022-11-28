import { atomFamily, Loadable } from "recoil";
import { CustomLoadable } from "@yper-script/react/app/notifiers/custom_loadable";
import { Order } from "@yper-script/react/data/entity/order.entity";
import { GetOrder } from "@yper-script/react/domain/usecase/get_order";

export class OrderNotifier {
  static provider = atomFamily<Loadable<Order>, string>({
    key: "current_order",
    default: id =>
      CustomLoadable.guard(async () => {
        return new GetOrder().call(id);
      }),
  });
}
