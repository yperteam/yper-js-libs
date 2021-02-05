import { StatusEnum } from "@yper-script/enums/StatusEnum";
/**
 * StatusHelper
 */
export default class StatusHelper {
    readonly intentCycle: StatusEnum[];
    readonly paymentCycle: StatusEnum[];
    readonly confirmedCycle: StatusEnum[];
    readonly deliveryCycle: StatusEnum[];
    readonly endCycle: StatusEnum[];
    readonly canceledCycle: StatusEnum[];
    readonly statusKeyAll = "status_all";
    readonly statusKeyIntent = "status_intent";
    readonly statusKeyLate = "status_late";
    readonly statusKeyWithoutShopper = "status_payment";
    readonly statusKeyProcessing = "status_processing";
    readonly statusKeyEnd = "status_end";
    readonly statusKeyCanceled = "status_canceled";
    readonly tradStatusEnum: {
        status_all: StatusEnum[];
        status_intent: StatusEnum[];
        status_payment: StatusEnum[];
        status_processing: StatusEnum[];
        status_end: StatusEnum[];
        status_canceled: StatusEnum[];
    };
    STATUS_GRAPH: any;
    constructor();
    next(status: string): any;
    previous(status: string): StatusEnum[];
    /**
     *
     * @param status
     */
    isRunning(status: StatusEnum): boolean;
}
