import { StreamNotifier } from "../stream_notifier";
import {
  ContactReason,
  GetProContactReasons,
} from "../../../domain/usecase/support/get_pro_contact_reasons";
import { Loadable, selector } from "recoil";

export class ProContactReasonsNotifier {
  static provider = StreamNotifier.provider({
    key: "pro_contact_reasons",
    stream: new GetProContactReasons()(),
  });

  // TODO type
  static byCategoryProvider = selector<ContactReason[]>({
    key: "pro_contact_reasons_category",
    get: ({ get }) => {
      return get(ProContactReasonsNotifier.provider).map(reasons =>
        reasons.reduce((reasons, reason) => {
          if (
            reasons.findIndex(c => c.categoryName == reason.categoryName) == -1
          )
            reasons.push(reason);
          return reasons;
        }, Array<ContactReason>())
      );
    },
  });
}
