export interface DateRangeInterface {
    begin: Date;
    end: Date;
}
export declare class StatsRangeNotifier {
    static provider: import("recoil").RecoilState<DateRangeInterface>;
    private static getDefaultValues;
}
