import { atom } from "recoil";

export interface DateRangeInterface {
  begin: Date;
  end: Date;
}

export class StatsRangeNotifier {
  static provider = atom<DateRangeInterface>({
    key: "stats_range",
    default: StatsRangeNotifier.getDefaultValues(),
  });

  private static getDefaultValues(): DateRangeInterface {
    let end = new Date();
    let begin = new Date();

    begin.setDate(begin.getDate() - 6);
    begin.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    return { begin: begin, end: end };
  }
}
