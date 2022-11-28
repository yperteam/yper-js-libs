import { GetCurrentPro } from "@yper-script/react/domain/usecase/get_current_pro";
import { selector } from "recoil";
import { Pro } from "@yper-script/react/data/entity/pro.entity";

export class CurrentProNotifier {
  static provider = selector<Pro>({
    key: "current_pro_provider",
    get: async ({}) => {
      return await new GetCurrentPro().call();
    },
    //Todo: To change cache handle policy update
    cachePolicy_UNSTABLE: { eviction: "most-recent" },
  });
}
