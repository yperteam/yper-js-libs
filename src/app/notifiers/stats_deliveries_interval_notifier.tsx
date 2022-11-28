import { selector } from "recoil";
import { StatsInterval } from "@yper-script/react/data/entity/stats_interval.enum";
import {
  DateRangeInterface,
  StatsRangeNotifier,
} from "@yper-script/react/app/notifiers/stats_range_notifier";
import moment from "moment";

export class StatsDeliveriesIntervalNotifier {
  static provider = selector<StatsInterval>({
    key: "stats_deliveries_interval_notifier",
    get: async ({ get }) => {
      let range = get(StatsRangeNotifier.provider);
      return StatsDeliveriesIntervalNotifier.computeInterval(range);
    },
    //Todo: To change cache handle policy update
    cachePolicy_UNSTABLE: { eviction: "most-recent" },
  });

  private static computeInterval(range: DateRangeInterface): StatsInterval {
    let begin = moment(range.begin);
    let end = moment(range.end);

    if (end.diff(begin, "years") > 1) {
      return StatsInterval.year;
    } else if (end.diff(begin, "months") >= 1) {
      return StatsInterval.month;
    } else if (end.diff(begin, "weeks") >= 1) {
      return StatsInterval.week;
    } else if (end.diff(begin, "days") >= 1) {
      return StatsInterval.day;
    } else {
      return StatsInterval.hour;
    }
  }
}
