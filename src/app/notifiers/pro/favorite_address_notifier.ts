import { FavoriteAddress } from "@yper-script/react/data/entity/favorite_address";
import { PaginatedResult } from "@yper-script/react/data/provider/http/paginated_result";
import { GetFavoriteAddress } from "@yper-script/react/domain/usecase/favorite_address/get_favorite_address";
import { atom, selector, selectorFamily } from "recoil";
import { StreamNotifier } from "../stream_notifier";

export class FavoriteAddressNotifier {
  static provider = StreamNotifier.provider<FavoriteAddress[]>({
    key: "get-favorite-address-provider",
    stream: new GetFavoriteAddress().call(),
  });

  static repertoryDetailProvider = selectorFamily<FavoriteAddress, string>({
    key: "get-repertory-detail-provider",
    get: (id: string) => ({ get }) => {
      const repertory = get(this.provider).contents as FavoriteAddress[];
      return repertory.find(r => r.id === id);
    },
  });

  static selectedId = atom<string>({
    key: "selected-repertory-id-provider",
    default: null,
  });
}
