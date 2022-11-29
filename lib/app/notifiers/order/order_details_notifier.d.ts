import { CallbackInterface, Loadable } from "recoil";
import { ReturnPolicy, TransportType } from "../../../data/entity/mission.entity";
export declare class OrderDetailsNotifier {
    static provider: (param: string) => import("recoil").RecoilState<Loadable<void>>;
    static notifier: (props: {
        prebookId: string;
        orderId: string;
        startDate: Date;
        endDate: Date;
        ceremonyDate: Date;
        transportType: TransportType;
        returnPolicy: ReturnPolicy;
        orderName: string;
        comment?: string;
        callback: CallbackInterface;
    }) => Promise<void>;
}
