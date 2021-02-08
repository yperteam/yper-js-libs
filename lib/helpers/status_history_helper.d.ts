import moment from "moment";
export default class StatusHistoryHelper {
    private statusHistory;
    constructor(statusHistory: StatusHistoryInterface[]);
    /**
     * Get time spent to search shopper
     */
    getTimeSpentForSearching(): moment.Duration;
}
interface StatusHistoryInterface {
    status: string;
    when: string;
    userId: string;
    extra: {};
}
export {};
