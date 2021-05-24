import flatpickr from "flatpickr";
import Options = flatpickr.Options.Options;
import "flatpickr/dist/themes/light.css";
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
    constructor(inputSelector: string, customOnChange?: Function, conf?: Options, mode?: "single" | "multiple" | "range" | "time", wrap?: boolean, dateFormat?: string);
    /**
     *
     * @param date
     */
    setDate(date: string): void;
    /**
     *
     * @return flatpickr.Instance
     */
    getInstance(): flatpickr.Instance;
}
