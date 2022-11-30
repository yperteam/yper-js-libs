import { DateRangeInterface } from "./stats_range_notifier";
import { DatedStatNumber } from "../../domain/model/dated_stat_number";
import { StatsInterval } from "../../data/entity/stats_interval.enum";
import moment from "moment";

export class DatedStatsNotifier {
  private static compareDates(
    interval: StatsInterval,
    first: Date,
    second: Date
  ): boolean {
    let firstMoment = moment(first);
    let secondMoment = moment(second);

    let compare: any;

    if (interval == StatsInterval.hour) {
      compare = "hours";
    } else if (interval == StatsInterval.day) {
      compare = "days";
    } else if (interval == StatsInterval.week) {
      compare = "weeks";
      firstMoment.set("weekday", 0);
      secondMoment.set("weekday", 0);
    } else if (interval == StatsInterval.month) {
      compare = "months";
      firstMoment.set("day", 1);
      secondMoment.set("day", 1);
    } else {
      compare = "years";
      firstMoment.set("dayOfYear", 1);
      secondMoment.set("dayOfYear", 1);
    }

    return firstMoment.diff(secondMoment, compare) == 0;
  }

  private static getDates(
    interval: StatsInterval,
    startDate: Date,
    endDate: Date
  ): Date[] {
    let dates: Date[] = [];
    const date = new Date(startDate);
    while (date < endDate) {
      dates = [...dates, new Date(date.getTime())];
      if (interval == StatsInterval.hour) {
        date.setHours(date.getHours() + 1);
      } else if (interval == StatsInterval.day) {
        date.setDate(date.getDate() + 1);
      } else if (interval == StatsInterval.week) {
        date.setDate(date.getDate() + 7);
      } else if (interval == StatsInterval.month) {
        date.setMonth(date.getMonth() + 1);
      } else {
        date.setFullYear(date.getFullYear() + 1);
      }
    }
    return dates;
  }

  static getFormattedValues(
    stats: DatedStatNumber[],
    interval: StatsInterval,
    begin: Date,
    end: Date
  ): DatedStatNumber[] {
    if (interval === StatsInterval.hour) {
      begin.setHours(8);
      end.setHours(22);
    }
    let period = this.getDates(interval, begin, end);

    return period.map(date => {
      return {
        date: date,
        value:
          stats.filter(s => {
            return DatedStatsNotifier.compareDates(interval, s.date, date);
          })[0]?.value ?? 0,
      };
    });
  }

  static getPreviousRange(
    interval: StatsInterval,
    range: DateRangeInterface
  ): DateRangeInterface {
    let begin = moment(range.begin.getTime());
    let end = moment(range.end.getTime());

    let diff = end.diff(begin);
    begin.subtract(diff);
    end.subtract(diff);

    return {
      begin: begin.toDate(),
      end: end.toDate(),
    };
  }
}
