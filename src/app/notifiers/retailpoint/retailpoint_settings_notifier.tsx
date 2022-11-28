import { selector } from "recoil";
import { CurrentProNotifier } from "../pro/current_pro_notifier";
import { CurrentRetailpointNotifier } from "./current_retailpoint_notifier";

export class RetailpointSettingsNotifier {
  static maxDeliveryValueProvider = selector({
    key: "retailpoint-settings",
    get: async ({ get }) => {
      let pro = get(CurrentProNotifier.provider);
      let rp = get(CurrentRetailpointNotifier.provider);
      return (
        (rp as any)?.settings?.maxDeliveryValue ??
        pro.settings.delivery.maxDeliveryValue
      );
    },
  });
}
