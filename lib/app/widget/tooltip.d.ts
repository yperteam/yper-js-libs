/// <reference types="react" />
import { Place } from "react-tooltip";
import { TextStyleClass } from "./theme";
interface TooltipInterface {
    id: string;
    content: string;
    icon?: string;
    image?: string;
    textContentStyle?: TextStyleClass;
    place?: Place;
    text?: string;
    textStyle?: TextStyleClass;
    custom?: boolean;
}
declare function CustomTooltipIcon(data: TooltipInterface): JSX.Element;
export declare const Tooltip: ({ ...props }: {
    [x: string]: any;
}) => JSX.Element;
export default CustomTooltipIcon;
