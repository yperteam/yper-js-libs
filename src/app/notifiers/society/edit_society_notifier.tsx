import { Society } from "../../../data/entity/society.entity";
import { SocietyRequestParams } from "../../../data/repository/society.repository";
import { EditSociety } from "../../../domain/usecase/society/edit_society";
import { atom, CallbackInterface, Loadable, RecoilLoadable } from "recoil";
import { CustomLoadable } from "../custom_loadable";

export class EditSocietyNotifier {
  static provider = atom<Loadable<Society>>({
    key: "edit-society",
    default: null,
  });

  static notifier = async (
    society: SocietyRequestParams,
    callback: CallbackInterface
  ) => {
    callback.set(EditSocietyNotifier.provider, RecoilLoadable.loading);
    callback.set(
      EditSocietyNotifier.provider,
      await CustomLoadable.guard(async () => {
        return await new EditSociety().call(society);
      })
    );
  };
}
