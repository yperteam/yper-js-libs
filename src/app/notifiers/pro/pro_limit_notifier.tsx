import { selector } from "recoil";
import { ProLimit } from "src/data/entity/pro_limit.entity";
import { GetProLimit } from "../../../domain/usecase/pro/get_pro_limit";

export class ProLimitNotifier {
  static provider = selector<ProLimit>({
    key: "pro_limit_provider",
    get: async ({ }) => {
      return await new GetProLimit().call();
    },
    //Todo: To change cache handle policy update
    cachePolicy_UNSTABLE: { eviction: "most-recent" },
  });
}
