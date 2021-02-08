import {StatusEnum} from "../enums/StatusEnum";

/**
 * StatusHelper
 */
export default class StatusHelper {
    public readonly intentCycle = [StatusEnum.intent];
    public readonly paymentCycle = [StatusEnum.payment];
    public readonly confirmedCycle = [StatusEnum.confirmed];
    public readonly deliveryCycle = [
        StatusEnum.started,
        StatusEnum.picked,
        StatusEnum.go,
        StatusEnum.returning,
    ];
    public readonly endCycle = [
        StatusEnum.returned,
        StatusEnum.delivered,
        StatusEnum.hold,
        StatusEnum.verified,
        StatusEnum.end,
    ];
    public readonly canceledCycle = [
        StatusEnum.requestCanceled,
        StatusEnum.bookingCanceled,
    ];

    public readonly statusKeyAll = "status_all";
    public readonly statusKeyIntent = "status_intent";
    public readonly statusKeyLate = "status_late";
    public readonly statusKeyWithoutShopper = "status_payment";
    public readonly statusKeyProcessing = "status_processing";
    public readonly statusKeyEnd = "status_end";
    public readonly statusKeyCanceled = "status_canceled";

    public readonly tradStatusEnum = {
        [this.statusKeyAll]: [
            ...this.paymentCycle,
            ...this.confirmedCycle,
            ...this.deliveryCycle,
        ],
        [this.statusKeyIntent]: this.intentCycle,
        [this.statusKeyWithoutShopper]: this.paymentCycle,
        [this.statusKeyProcessing]: this.deliveryCycle,
        [this.statusKeyEnd]: this.endCycle,
        [this.statusKeyCanceled]: this.canceledCycle,
    };

    STATUS_GRAPH: any = {
        // [StatusEnum.intent]: [StatusEnum.created], // Not available
        // [StatusEnum.created]: [StatusEnum.payment], // Not available
        // [StatusEnum.payment]: [StatusEnum.confirmed],  //Not available
        [StatusEnum.confirmed]: [StatusEnum.started],
        [StatusEnum.started]: [StatusEnum.picked],
        [StatusEnum.picked]: [StatusEnum.go],
        [StatusEnum.go]: [StatusEnum.delivered, StatusEnum.returning],
        // [StatusEnum.delivered]: [StatusEnum.hold, StatusEnum.verified], // A job do that
        [StatusEnum.returning]: [StatusEnum.returned],
        // [StatusEnum.returned]: [StatusEnum.delivered], // A job do that
        [StatusEnum.hold]: [StatusEnum.verified],
        [StatusEnum.verified]: [StatusEnum.end],
    };

    constructor() {
    }

    public next(status: string) {
        return this.STATUS_GRAPH[status] !== undefined
            ? this.STATUS_GRAPH[status]
            : [];
    }

    public previous(status: string) {
        let keys: StatusEnum[] = [];

        Object.keys(this.STATUS_GRAPH).map((key: StatusEnum) => {
            if (this.STATUS_GRAPH[key].includes(status)) {
                keys.push(key);
            }
        });

        return keys;
    }

    /**
     *
     * @param status
     */
    public isRunning(status: StatusEnum) {
        return [
            StatusEnum.started,
            StatusEnum.picked,
            StatusEnum.go,
            StatusEnum.delivered,
            StatusEnum.returning,
            StatusEnum.returned,
        ].includes(status);
    }
}
