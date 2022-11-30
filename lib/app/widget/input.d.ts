import { TextInterface } from "./mixins";
import { SpacingProps, ColProps } from "./generic";
export declare const FormContainer: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, ColProps & {
    bgColor?: string;
}, never>;
export declare const Input: import("styled-components").StyledComponent<"input", import("styled-components").DefaultTheme, SpacingProps & {
    textAlign?: string;
}, never>;
export declare const Textarea: import("styled-components").StyledComponent<"textarea", import("styled-components").DefaultTheme, {}, never>;
export declare const InputLabel: import("styled-components").StyledComponent<"label", import("styled-components").DefaultTheme, TextInterface, never>;
