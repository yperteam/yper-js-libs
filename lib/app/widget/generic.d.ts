export interface RowProps extends SpacingProps {
    width?: number | string;
    height?: number | string;
    display?: string;
    center?: string;
    direction?: string;
    justifyContent?: string;
    alignItems?: string;
    wrap?: string;
    size?: number | string;
}
export declare const RowDefault: RowProps;
export interface ColProps extends SpacingProps {
    size?: number;
    justifyContent?: string;
    alignItems?: string;
}
export interface SpacingProps {
    margin?: {
        top?: number | string;
        right?: number | string;
        bottom?: number | string;
        left?: number | string;
    };
    padding?: {
        top?: number | string;
        right?: number | string;
        bottom?: number | string;
        left?: number | string;
    };
}
interface FlexProps extends SpacingProps {
    size?: number;
    justifyContent?: string;
    alignItems?: string;
    grow?: number;
    textAlign?: string;
}
export declare const SpacingStyle: (props: SpacingProps) => import("styled-components").FlattenSimpleInterpolation;
export declare const Row: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, RowProps, never>;
export declare const Column: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, RowProps, never>;
export declare const Select: import("styled-components").StyledComponent<"select", import("styled-components").DefaultTheme, {}, never>;
export declare const Col: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, ColProps, never>;
export declare const Spacing: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, SpacingProps, never>;
export declare const Flexible: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, FlexProps, never>;
export declare const Expanded: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, FlexProps, never>;
export declare const Container: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {}, never>;
export {};
