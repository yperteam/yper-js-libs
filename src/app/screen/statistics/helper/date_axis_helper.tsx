import { capitalizeText } from "@yper-script/react/app/widget/helper/capitalize_text";
import { StatsInterval } from "@yper-script/react/data/entity/stats_interval.enum";
import DatedStatNumber from "@yper-script/react/domain/model/dated_stat_number";
import moment from "moment";

// TODO handle this better to introduce translations
const DAY = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];
const MONTH = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Aout",
  "Septembre",
  "Octobre",
  "Novembre",
  "Decembre",
];

export function dateDisplay(interval: StatsInterval, stat: DatedStatNumber) {
  let momentDate = moment(stat.date);
  switch (interval) {
    case StatsInterval.month:
      return momentDate.format("MMMM YY");
    case StatsInterval.year:
      return stat.date.getFullYear();
    case StatsInterval.week:
      return "Semaine " + momentDate.week();
    case StatsInterval.day:
      return capitalizeText(momentDate.format("dddd DD/MM"));
    case StatsInterval.hour:
      return momentDate.format("kk:mm");
  }
}
