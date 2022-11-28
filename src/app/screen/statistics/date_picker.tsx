// @ts-nocheck

import React from "react";
import { Row } from "@yper-script/react/app/widget/generic";
import { Text } from "@yper-script/react/app/widget/mixins";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import Calendar from "react-calendar";
import Fit from "react-fit";
import mergeClassNames from "merge-class-names";

/* TODO to add custom shortcuts for period class CustomDatePicker extends DateRangePicker {

  override   renderCalendar()   {
    const { disableCalendar } = this.props;
    const { isOpen } = this.state;

    if (isOpen === null || disableCalendar) {
      return null;
    }

    const {
      calendarClassName,
      className: datePickerClassName, // Unused, here to exclude it from calendarProps
      onChange,
      value,
      ...calendarProps
    } = this.props;

    const className = `${this.baseClassName}__calendar`;

    return (
      <Fit>
        <div className={mergeClassNames(className, `${className}--${isOpen ? 'open' : 'closed'}`)}>
          <Row direction="row">
            <Text>TEST</Text>
            <Calendar
              className={calendarClassName}
              onChange={this.onChange}
              selectRange
              value={value || null}
              {...calendarProps}
            />
          </Row>
        </div>
      </Fit>
    );
  }
}

export default CustomDatePicker;*/

/** Styled Component */
