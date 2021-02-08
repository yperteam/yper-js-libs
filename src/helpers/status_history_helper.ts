import { StatusEnum } from "../enums/StatusEnum";
import { isSet } from "./generic_helper";
import moment from "moment";

export default class StatusHistoryHelper {
    private statusHistory: StatusHistoryInterface[];

    constructor(statusHistory: StatusHistoryInterface[]) {
        this.statusHistory = statusHistory;
    }

    /**
     * Get time spent to search shopper
     */
    public getTimeSpentForSearching(): moment.Duration {
        let lastSearchingStatus: StatusHistoryInterface;
        let nextStatus: StatusHistoryInterface;
        let indexOfLastSearchingStatus: number;
        // @ts-ignore
        for (const [index, statusObject] of this.statusHistory.entries()) {
            if (statusObject.status === StatusEnum.payment) {
                lastSearchingStatus = statusObject;
                indexOfLastSearchingStatus = index;
            }
        }

        if (!isSet(lastSearchingStatus)) {
            // To return 0 minute
            const momentNow = moment();
            return moment.duration(momentNow.diff(momentNow));
        }

        nextStatus = this.statusHistory[indexOfLastSearchingStatus + 1];

        if (isSet(nextStatus)) {
            return moment.duration(
                moment(nextStatus.when).diff(moment(lastSearchingStatus.when))
            );
        }
        return moment.duration(moment().diff(moment(lastSearchingStatus.when)));
    }
}

interface StatusHistoryInterface {
    status: string;
    when: string;
    userId: string;
    extra: {};
}
