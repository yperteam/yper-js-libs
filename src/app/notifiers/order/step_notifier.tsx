import { selectorFamily } from "recoil";
import { PrebookNotifier } from "./prebook_notifier";

export class StepNotifier {
  static provider = selectorFamily({
    key: "current_prebook_step",
    get: (prebookId: string) => ({ get }) => {
      let prebook = get(PrebookNotifier.provider(prebookId));
      if (prebook?.state != "hasValue") return 0;
      return (prebook.contents.receiver?.address?.formattedAddress?.length ??
        0) != 0 && prebook.contents.receiver.phone
        ? prebook.contents.extra.nbItems == null
          ? 1
          : 2
        : 0;
    },
  });
}
