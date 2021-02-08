import moment from "moment";
import {
    DateInvoiceParamsEnum,
    SearchCommonParamsEnum,
    SearchDeliveriesParamsEnum,
} from "../enums/RoutesParametersKeys";

export class DateHelper {
    public static yesterdayStart = moment()
        .subtract(1, "days")
        .startOf("day")
        .toISOString();

    public static yesterdayEnd = moment()
        .subtract(1, "days")
        .endOf("day")
        .toISOString();

    public static todayStart = moment()
        .startOf("day")
        .toISOString();

    public static todayEnd = moment()
        .endOf("day")
        .toISOString();

    public static tomorrowStart = moment()
        .add(1, "days")
        .startOf("day")
        .toISOString();

    public static tomorrowEnd = moment()
        .add(1, "days")
        .endOf("day")
        .toISOString();

    public static weekStart = moment()
        .startOf("week")
        .startOf("day")
        .toISOString();

    public static weekEnd = moment()
        .endOf("week")
        .endOf("day")
        .toISOString();

    public static monthStart = moment()
        .startOf("month")
        .startOf("day")
        .toISOString();

    public static monthEnd = moment()
        .endOf("month")
        .endOf("day")
        .toISOString();

    protected dates = {
        yesterday: {
            mission_start: DateHelper.yesterdayStart,
            mission_end: DateHelper.yesterdayEnd,
        },
        today: {
            mission_start: DateHelper.todayStart,
            mission_end: DateHelper.todayEnd,
        },
        tomorrow: {
            mission_start: DateHelper.tomorrowStart,
            mission_end: DateHelper.tomorrowEnd,
        },
        week: {
            mission_start: DateHelper.weekStart,
            mission_end: DateHelper.weekEnd,
        },
        month: {
            mission_start: DateHelper.monthStart,
            mission_end: DateHelper.monthEnd,
        },
    };

    protected datesSearchDeliveries = {
        yesterday: {
            [SearchDeliveriesParamsEnum.mission_start]:
                DateHelper.yesterdayStart,
            [SearchDeliveriesParamsEnum.mission_end]: DateHelper.yesterdayEnd,
        },
        today: {
            [SearchDeliveriesParamsEnum.mission_start]: DateHelper.todayStart,
            [SearchDeliveriesParamsEnum.mission_end]: DateHelper.todayEnd,
        },
        tomorrow: {
            [SearchDeliveriesParamsEnum.mission_start]:
                DateHelper.tomorrowStart,
            [SearchDeliveriesParamsEnum.mission_end]: DateHelper.tomorrowEnd,
        },
        week: {
            [SearchDeliveriesParamsEnum.mission_start]: DateHelper.weekStart,
            [SearchDeliveriesParamsEnum.mission_end]: DateHelper.weekEnd,
        },
        month: {
            [SearchDeliveriesParamsEnum.mission_start]: DateHelper.monthStart,
            [SearchDeliveriesParamsEnum.mission_end]: DateHelper.monthEnd,
        },
    };

    protected creationDates = {
        today: {
            [SearchCommonParamsEnum.created_start]: DateHelper.todayStart,
            [SearchCommonParamsEnum.created_end]: DateHelper.todayEnd,
        },
        week: {
            [SearchCommonParamsEnum.created_start]: DateHelper.weekStart,
            [SearchCommonParamsEnum.created_end]: DateHelper.weekEnd,
        },
        month: {
            [SearchCommonParamsEnum.created_start]: DateHelper.monthStart,
            [SearchCommonParamsEnum.created_end]: DateHelper.monthEnd,
        },
    };

    protected diffDates = {
        from_one_week: {
            last_connection__gte: moment()
                .subtract(7, "days")
                .toISOString(),
        },
        until_one_week: {
            last_connection__lte: moment()
                .subtract(7, "days")
                .toISOString(),
        },
        until_one_month: {
            last_connection__lte: moment()
                .subtract(30, "days")
                .toISOString(),
        },
        until_three_months: {
            last_connection__lte: moment()
                .subtract(90, "days")
                .toISOString(),
        },
        until_one_year: {
            last_connection__lte: moment()
                .subtract(365, "days")
                .toISOString(),
        },
    };

    protected invoiceDates = {
        "last-fifteen-days": {
            [DateInvoiceParamsEnum.start]: moment()
                .subtract(15, "days")
                .toISOString(),
            [DateInvoiceParamsEnum.end]: moment().toISOString(),
        },
        "last-thirty-days": {
            [DateInvoiceParamsEnum.start]: moment()
                .subtract(30, "days")
                .toISOString(),
            [DateInvoiceParamsEnum.end]: moment().toISOString(),
        },
        "last-three-months": {
            [DateInvoiceParamsEnum.start]: moment()
                .subtract(3, "months")
                .toISOString(),
            [DateInvoiceParamsEnum.end]: moment().toISOString(),
        },
        "last-six-months": {
            [DateInvoiceParamsEnum.start]: moment()
                .subtract(6, "months")
                .toISOString(),
            [DateInvoiceParamsEnum.end]: moment().toISOString(),
        },
        "last-year": {
            [DateInvoiceParamsEnum.start]: moment()
                .subtract(1, "years")
                .toISOString(),
            [DateInvoiceParamsEnum.end]: moment().toISOString(),
        },
    };

    public getDates() {
        return this.dates;
    }

    public getSearchDeliveriesDates() {
        return this.datesSearchDeliveries;
    }

    public getDiffDates() {
        return this.diffDates;
    }

    public getInvoiceDates() {
        return this.invoiceDates;
    }

    public getCreationDates() {
        return this.creationDates;
    }
}
