import { SocietyRegistry } from "@yper-script/react/data/entity/society_registry.entity";
import { SearchSocietyRegistry } from "@yper-script/react/domain/usecase/society/search_society";
import { atom, CallbackInterface, Loadable, RecoilLoadable } from "recoil";
import { CustomLoadable } from "../custom_loadable";

export class SearchSocietyNotifier {
  static provider = atom<Loadable<SocietyRegistry>>({
    key: "search-society-provider",
    default: null,
  });

  static notifier = async (
    registryNumber: string,
    callback: CallbackInterface
  ) => {
    callback.set(SearchSocietyNotifier.provider, RecoilLoadable.loading);
    callback.set(
      SearchSocietyNotifier.provider,
      await CustomLoadable.guard(async () => {
        return await new SearchSocietyRegistry().call(registryNumber);
      })
    );
  };
}
