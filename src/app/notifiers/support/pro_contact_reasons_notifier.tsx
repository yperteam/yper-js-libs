import { StreamNotifier } from "../stream_notifier";
import {
  ContactReason,
  GetContactReasons,
} from "../../../domain/usecase/support/get_contact_reasons";
import { selector } from "recoil";

export class ContactReasonsNotifier {
  static provider = StreamNotifier.provider({
    key: "contact_reasons_notifier",
    stream: new GetContactReasons()(),
  });

  // TODO type
  static byCategoryProvider = selector<ContactReason[]>({
    key: "contact_reasons_category_notifier",
    get: ({ get }) => {
      return get(ContactReasonsNotifier.provider).map(reasons =>
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
