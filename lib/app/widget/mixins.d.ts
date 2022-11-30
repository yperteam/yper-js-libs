import { DefaultTheme } from "styled-components";
import { TextStyleClass } from "./theme";
import SVG from "react-inlinesvg";
import { SpacingProps } from "./generic";
export interface TextInterface extends SpacingProps {
    textStyle?: TextStyleClass;
    theme?: DefaultTheme;
    textAlign?: string;
}
export interface LabelInterface extends TextInterface {
    for?: string;
}
export declare const Text: import("styled-components").StyledComponent<"p", DefaultTheme, TextInterface, never>;
export declare const Label: import("styled-components").StyledComponent<"label", DefaultTheme, LabelInterface, never>;
export declare const Icon: import("styled-components").StyledComponent<"i", DefaultTheme, TextInterface, never>;
export declare const MaterialIcon: import("styled-components").StyledComponent<"i", DefaultTheme, {
    className: "material-icons";
} & {
    name: string;
    color?: string;
}, "className">;
export declare const SvgPicture: import("styled-components").StyledComponent<typeof SVG, DefaultTheme, SpacingProps & {
    color?: string;
    width?: string;
    height?: string;
}, never>;
export declare const BoldText: import("styled-components").StyledComponent<"span", DefaultTheme, {}, never>;
