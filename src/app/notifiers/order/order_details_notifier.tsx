import { atomFamily, CallbackInterface, Loadable } from "recoil";
import { CustomLoadable } from "@yper-script/react/app/notifiers/custom_loadable";
import {
  ReturnPolicy,
  TransportType,
} from "@yper-script/react/data/entity/mission.entity";
import { EditPrebookDetails } from "@yper-script/react/domain/usecase/order/edit_prebook_details";

export class OrderDetailsNotifier {
  static provider = atomFamily<Loadable<void>, string>({
    key: "order_details_provider",
    default: null,
  });

  static notifier = async (props: {
    prebookId: string;
    orderId: string;
    startDate: Date;
    endDate: Date;
    ceremonyDate: Date;
    transportType: TransportType;
    returnPolicy: ReturnPolicy;
    orderName: string;
    comment?: string;
    callback: CallbackInterface;
  }) => {
    props.callback.set(
      OrderDetailsNotifier.provider(props.orderId),
      CustomLoadable.loading
    );
    props.callback.set(
      OrderDetailsNotifier.provider(props.orderId),
      await CustomLoadable.guard(async () =>
        new EditPrebookDetails().call({
          prebookId: props.prebookId,
          startDate: props.startDate,
          endDate: props.endDate,
          ceremonyDate: props.ceremonyDate,
          transportType: props.transportType,
          returnPolicy: props.returnPolicy,
          orderName: props.orderName,
          comment: props.comment,
        })
      )
    );
  };
}
