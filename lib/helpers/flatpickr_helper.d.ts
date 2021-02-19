import flatpickr from "flatpickr";
import Options = flatpickr.Options.Options;
export default class FlatpickrHelper {
    private $flatPickr;
    static modeSingle: string;
    static modeMultiple: string;
    static modeRange: string;
    static modeTime: string;
    /**
     *
     * @param inputSelector
     * @param wrap
     * @param mode
     * @param dateFormat
     * @param customOnChange
     * @param conf
     */
    constructor(inputSelector: string, customOnChange?: Function, mode?: "single" | "multiple" | "range" | "time", wrap?: boolean, dateFormat?: string, conf?: Options);
    /**
     *
     * @param date
     */
    setDate(date: string): void;
}
