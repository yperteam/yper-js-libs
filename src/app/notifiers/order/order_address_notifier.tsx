import { atomFamily, CallbackInterface, Loadable } from "recoil";
import { CustomLoadable } from "../../../app/notifiers/custom_loadable";
import { EditPrebookAddress } from "../../../domain/usecase/order/edit_prebook_address";
import {
  MissionClient,
  MissionClientType,
} from "../../../data/entity/mission.entity";
import { AddFavoriteAddress } from "../../../domain/usecase/favorite_address/add_favorite_address";

export class OrderAddressNotifier {
  static provider = atomFamily<Loadable<void>, string>({
    key: "order_address_provider",
    default: null,
  });

  static previewProvider = atomFamily<Loadable<void>, string>({
    key: "preview_order_address_provider",
    default: null,
  });

  static notifier = async (
    receiver: MissionClient,
    sender: MissionClient,
    setFavoriteReceiver: boolean,
    setFavoriteSender: boolean,
    prebookId: string,
    orderId: string,
    callback: CallbackInterface
  ) => {
    const provider = OrderAddressNotifier.provider(orderId);
    callback.set(provider, CustomLoadable.loading);
    callback.set(
      provider,
      await CustomLoadable.guard(async () => {
        if (
          setFavoriteReceiver &&
          receiver.type == MissionClientType.user &&
          receiver.address?.favoriteAddressId == null
        ) {
          const addr = await new AddFavoriteAddress().call(receiver);
          receiver.address.favoriteAddressId = addr.id;
        }
        if (
          setFavoriteSender &&
          sender.type == MissionClientType.user &&
          sender.address?.favoriteAddressId == null
        ) {
          const addr = await new AddFavoriteAddress().call(sender);
          sender.address.favoriteAddressId = addr.id;
        }
        return new EditPrebookAddress().call({
          prebookId: prebookId,
          receiver: receiver,
          sender: sender,
          receiverAddress: receiver.address,
          senderAddress: sender?.address,
        });
      })
    );
  };

  static previewNotifier = async (
    receiver: MissionClient,
    sender: MissionClient,
    prebookId: string,
    orderId: string,
    callback: CallbackInterface
  ) => {
    const provider = OrderAddressNotifier.previewProvider(orderId);
    callback.set(provider, CustomLoadable.loading);
    callback.set(
      provider,
      await CustomLoadable.guard(async () =>
        new EditPrebookAddress().call({
          prebookId: prebookId,
          receiver: { id: receiver.id, type: receiver.type },
          sender: { id: sender.id, type: sender.type },
          receiverAddress: receiver.address,
          senderAddress: sender.address,
        })
      )
    );
  };
}
