import React, { Component, useState } from "react";
import { CSSObject } from "@emotion/serialize";
import moment, { Moment } from "moment";
import * as chrono from "chrono-node";
import Select, {
  GroupProps,
  OptionProps,
  components as SelectComponents,
} from "react-select";
import styled from "styled-components";
import { Row } from "@yper-script/react/app/widget/generic";
import { MaterialIcon, SvgPicture } from "@yper-script/react/app/widget/mixins";
import { CurrentProNotifier } from "@yper-script/react/app/notifiers/pro/current_pro_notifier";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "@yper-script/react/app/widget/button";

const TimeSlotIcon = "/img/react/icon/ic_time_clock_circle.svg";

interface DateOption {
  date: Moment;
  value: Date;
  label: string;
  display?: string;
}

const createOptionForDate = (d: Moment | Date) => {
  const date = moment.isMoment(d) ? d : moment(d);
  return {
    date,
    value: date.toDate(),
    label: date.locale("fr").calendar(null, {
      sameDay: "[Aujourd'hui]",
      nextDay: "[Demain]",
      nextWeek: "dddd [prochain] (Do MMM YYYY)",
      sameElse: "Do MMMM YYYY",
    }),
  };
};

const createCalendarOptions = (date = new Date()) => {
  const daysInMonth = Array.apply(null, Array(moment(date).daysInMonth())).map(
    (x, i) => {
      const d = moment(date).date(i + 1);
      return { ...createOptionForDate(d), display: "calendar" };
    }
  );
  return {
    label: moment(date).format("MMMM YYYY"),
    options: [
      ...Array(getDayPadding(daysInMonth[0].date)).fill({
        ...{
          value: null,
          label: null,
        },
        display: "calendar",
      }),
      ...daysInMonth,
    ],
  };
};

interface CalendarGroup {
  label: string;
  options: readonly DateOption[];
}

const defaultOptions: (DateOption | CalendarGroup)[] = [
  ...["aujourd'hui", "demain"].map(i =>
    createOptionForDate(chrono.fr.parseDate(i))
  ),
  createCalendarOptions(),
];

const provider = atom<DatePickerState>({
  key: "date-picker-state",
  default: {
    options: defaultOptions,
  },
});

function getDayPadding(m: Moment) {
  const weekDay = m.weekday();
  return weekDay;
}

const suggestions = [
  "dimanche",
  "samedi",
  "vendredi",
  "jeudi",
  "mercredi",
  "mardi",
  "lundi",
  "decembre",
  "novembre",
  "octobre",
  "septembre",
  "aout",
  "juillet",
  "juin",
  "mai",
  "avril",
  "mars",
  "fevrier",
  "janvier",
  "demain",
  "aujourd'hui",
].reduce<{ [key: string]: string }>((acc, str) => {
  for (let i = 1; i < str.length; i++) {
    acc[str.substr(0, i)] = str;
  }
  return acc;
}, {});

const suggest = (str: string) =>
  str
    .split(/\b/)
    .map(i => suggestions[i] || i)
    .join("");

const days = ["L", "M", "M", "J", "V", "S", "D"];

const Group = (props: GroupProps<DateOption, false>) => {
  const {
    Heading,
    getStyles,
    children,
    label,
    headingProps,
    cx,
    theme,
    selectProps,
  } = props;
  const [{ options }, setState] = useRecoilState(provider);
  const nextDate = moment(
    (options.find(o => (o as any).options) as CalendarGroup).options.find(
      o => o.value
    ).date
  );
  const prevDate = moment(nextDate).add(-1, "month");
  const beforeToday = moment().diff(prevDate, "month") > 0;
  nextDate.add(1, "month");
  return (
    //@ts-ignore
    <div aria-label={label as string} css={getStyles("group", props)}>
      <Row justifyContent="space-between" alignItems="center">
        <ButtonSecondary
          onClick={
            beforeToday
              ? null
              : () => {
                  setState({
                    options: [
                      createOptionForDate(prevDate),
                      createCalendarOptions(prevDate.toDate()),
                    ],
                  });
                }
          }
        >
          <SvgPicture src="/img/react/icon/ic_chevron_left.svg" height="14px" />
        </ButtonSecondary>
        <Heading
          selectProps={selectProps}
          theme={theme}
          getStyles={getStyles}
          cx={cx}
          {...headingProps}
        >
          {label}
        </Heading>
        <ButtonSecondary
          onClick={() => {
            setState({
              options: [
                createOptionForDate(nextDate),
                createCalendarOptions(nextDate.toDate()),
              ],
            });
          }}
        >
          <SvgPicture
            src="/img/react/icon/ic_chevron_right.svg"
            height="14px"
          />
        </ButtonSecondary>
      </Row>
      <DaysHeader
        justifyContent="space-around"
        margin={{ top: "5px" }}
        padding={{ top: "5px" }}
      >
        {days.map((day, i) => (
          <DaysHeaderItem key={`${i}-${day}`}>{day}</DaysHeaderItem>
        ))}
      </DaysHeader>
      <Row
        padding={{ top: "5px", left: "2%" }}
        wrap="wrap"
        justifyContent="start"
      >
        {children}
      </Row>
    </div>
  );
};

const getOptionStyles = (defaultStyles: CSSObject): CSSObject => ({
  ...defaultStyles,
  width: "12%",
  margin: "0 1%",
  textAlign: "center",
  borderRadius: "4px",
  cursor: "pointer",
});

const Option = (props: OptionProps<DateOption, false>) => {
  const { data, getStyles, innerRef, innerProps } = props;
  if (data.display === "calendar") {
    const defaultStyles = getStyles("option", props);
    const styles = getOptionStyles(defaultStyles);
    return (
      //@ts-ignore
      <span {...innerProps} style={styles} ref={innerRef}>
        {data.date?.format("D") ?? ""}
      </span>
    );
  } else return <SelectComponents.Option {...props} />;
};

interface DatePickerProps {
  readonly value: Date | null;
  readonly onChange: (value: Date) => void;
}

interface DatePickerState {
  readonly options: readonly (DateOption | CalendarGroup)[];
}

const isToday = someDate => {
  const today = new Date();
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
};

export const ValueContainer = ({ children, ...props }) => {
  return (
    //@ts-ignore
    <SelectComponents.ValueContainer {...props}>
      <Row alignItems="center">
        {!!children && (
          <SvgPicture
            src={TimeSlotIcon}
            width="16px"
            height="16px"
            margin={{ right: "8px" }}
          />
        )}
        {children}
      </Row>
    </SelectComponents.ValueContainer>
  );
};

export function DatePicker(props: DatePickerProps) {
  const [{ options }, setState] = useRecoilState(provider);
  const pro = useRecoilValue(CurrentProNotifier.provider);
  const handleInputChange = (value: string) => {
    if (!value) {
      setState({ options: defaultOptions });
      return;
    }
    const now = new Date();
    const date = chrono.fr.parseDate(suggest(value.toLowerCase()), now, {
      forwardDate: true,
    });

    if (date && date >= now) {
      // FIXME use param for minDate
      setState({
        options: [createOptionForDate(date), createCalendarOptions(date)],
      });
    } else {
      setState({
        options: [],
      });
    }
  };
  return (
    <div style={{ width: "100%" }}>
      <Select<DateOption, false>
        {...props}
        components={{
          Group,
          Option,
          IndicatorSeparator: () => null,
          ValueContainer,
        }}
        filterOption={null}
        isMulti={false}
        isOptionSelected={(o, v) =>
          v.some(
            i => o?.date != null && (i.date?.isSame(o.date, "day") ?? false)
          )
        }
        maxMenuHeight={380}
        onChange={v => props.onChange(v.date.toDate())}
        onInputChange={handleInputChange}
        options={options}
        isOptionDisabled={o => {
          if (o?.value == null) return true;
          const selected = new Date(o.value.getTime());
          const tooLate =
            isToday(selected) &&
            selected.getHours() * 60 +
              60 +
              pro.settings.delivery.minimumMinutesBeforeStart +
              pro.settings.delivery.minimumMinutesBetweenStartAndEnd >=
              1440;
          selected.setHours(23, 59);
          return selected.getTime() < new Date().getTime() || tooLate;
        }}
        value={createOptionForDate(props.value)}
      />
    </div>
  );
}

const DaysHeader = styled(Row)`
  border-top: "1px solid #eee";
`;

const DaysHeaderItem = styled.span`
  color: "#999";
  cursor: "pointer";
  font-size: "75%";
  font-weight: 500;
  margin: "0 1%";
  width: "12%";
  text-align: "center";
  padding: "8px 12px";
`;
