import flatpickr from "flatpickr";
import {French} from "flatpickr/dist/l10n/fr";
import Options = flatpickr.Options.Options;
import "flatpickr/dist/themes/light.css";

flatpickr.localize(French);

export default class FlatpickrHelper {
    private $flatPickr: flatpickr.Instance;

    static modeSingle = "single";
    static modeMultiple = "multiple";
    static modeRange = "range";
    static modeTime = "time";

    /**
     *
     * @param inputSelector
     * @param wrap
     * @param mode
     * @param dateFormat
     * @param customOnChange
     * @param conf
     */
    constructor(
        inputSelector: string,
        customOnChange: Function = null,
        conf: Options = {},
        mode: "single" | "multiple" | "range" | "time" = "single",
        wrap: boolean = true,
        dateFormat: string = "d-m-Y"
    ) {
        this.$flatPickr = flatpickr(document.querySelector(inputSelector), {
            wrap: wrap,
            mode: mode,
            dateFormat: dateFormat,
            ...conf,
            onChange: (selectedDates, dateStr, instance) => {
                if (customOnChange instanceof Function) {
                    if (
                        mode === FlatpickrHelper.modeRange &&
                        selectedDates.length == 2
                    ) {
                        return customOnChange.call(
                            selectedDates,
                            dateStr,
                            instance
                        );
                    } else if (
                        mode === FlatpickrHelper.modeSingle ||
                        mode === FlatpickrHelper.modeMultiple ||
                        mode === FlatpickrHelper.modeTime
                    ) {
                        return customOnChange.call(
                            selectedDates,
                            dateStr,
                            instance
                        );
                    }
                }
            },
        });

        return this;
    }

    /**
     *
     * @param date
     */
    public setDate(date: string) {
        return this.$flatPickr.setDate(date);
    }

    /**
     *
     * @return flatpickr.Instance
     */
    public getInstance(): flatpickr.Instance {
        return this.$flatPickr;
    }
}
