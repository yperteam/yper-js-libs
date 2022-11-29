import { CallbackInterface } from "recoil";
import { FormattedProDeliverer } from "../../../domain/model/formated_deliverer.model";
export declare class DislikeDelivererFamilyNotifier {
    static provider: (param: any) => import("recoil").RecoilState<any>;
    static notifier: (deliverer: FormattedProDeliverer, callback: CallbackInterface) => Promise<void>;
}
