import styled, { css } from "styled-components";
import { device } from "./breakpoints";

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

export const RowDefault: RowProps = {
  width: "inherit",
  height: "auto",
  display: "flex",
  center: "center",
  direction: "row",
  justifyContent: "center",
  alignItems: "normal",
  wrap: "nowrap",
  size: "initial",
};

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

const ColDefault: ColProps = {
  size: 1,
  justifyContent: "inherit",
  alignItems: "normal",
};

export const SpacingStyle = (props: SpacingProps) => css`
  margin-top: ${props.margin?.top ?? 0};
  margin-bottom: ${props.margin?.bottom ?? 0};
  margin-right: ${props.margin?.right ?? 0};
  margin-left: ${props.margin?.left ?? 0};
  padding-top: ${props.padding?.top ?? 0};
  padding-bottom: ${props.padding?.bottom ?? 0};
  padding-right: ${props.padding?.right ?? 0};
  padding-left: ${props.padding?.left ?? 0};
`;

export const Row = styled.div<RowProps>`
  ${(props: SpacingProps) => SpacingStyle(props)}
  width: ${(props: RowProps) => (props.width ? props.width : RowDefault.width)};
  height: ${(props: RowProps) =>
    props.height ? props.height : RowDefault.height};
  display: ${(props: RowProps) =>
    props.display ? props.display : RowDefault.display};
  flex-direction: ${(props: RowProps) =>
    props.direction ? props.direction : RowDefault.direction};
  justify-content: ${(props: RowProps) =>
    props.justifyContent ? props.justifyContent : RowDefault.justifyContent};
  align-items: ${(props: RowProps) =>
    props.alignItems ? props.alignItems : RowDefault.alignItems};
  flex-wrap: ${(props: RowProps) =>
    props.wrap ? props.wrap : RowDefault.wrap};
  flex:${(props: RowProps) => (props.size ? props.size : RowDefault.size)};
`;

export const Column = styled.div<RowProps>`
  ${(props: SpacingProps) => SpacingStyle(props)}
  width: ${(props: RowProps) => (props.width ? props.width : RowDefault.width)};
  height: ${(props: RowProps) =>
    props.height ? props.height : RowDefault.height};
  display: ${(props: RowProps) =>
    props.display ? props.display : RowDefault.display};
  justify-content: ${(props: RowProps) =>
    props.center ? props.center : RowDefault.center};
  flex-direction: ${(props: RowProps) =>
    props.direction ? props.direction : "column"};
  justify-content: ${(props: RowProps) =>
    props.justifyContent ? props.justifyContent : RowDefault.justifyContent};
  align-items: ${(props: RowProps) =>
    props.alignItems ? props.alignItems : RowDefault.alignItems};
  flex:${(props: RowProps) => (props.size ? props.size : RowDefault.size)};
`;

export const Select = styled.select`
  margin: 0;
  background: #ffffff;
  border: 1px solid #dce3e8;
  box-sizing: border-box;
  border-radius: 2px;
`;

//Todo: Handle Responsive with params
export const Col = styled.div<ColProps>`
  ${(props: SpacingProps) => SpacingStyle(props)};
  display: flex;
  flex: ${(props: ColProps) => (props.size ? props.size : ColDefault.size)};
  justify-content: ${(props: ColProps) =>
    props.justifyContent ? props.justifyContent : ColDefault.justifyContent};
  align-items: ${(props: ColProps) =>
    props.alignItems ? props.alignItems : ColDefault.alignItems};
`;

const FlexDefault: FlexProps = {
  size: 1,
  justifyContent: "inherit",
};

export const Spacing = styled.div<SpacingProps>`
  ${(props: SpacingProps) => SpacingStyle(props)}
`;

//Todo: Handle Responsive with params
export const Flexible = styled.div<FlexProps>`
  ${(props: SpacingProps) => SpacingStyle(props)}
  display: flex;
  flex: ${(props: FlexProps) => (props.size ? props.size : FlexDefault.size)};
  justify-content: ${(props: FlexProps) =>
    props.justifyContent ? props.justifyContent : FlexDefault.justifyContent};
  align-items: ${(props: FlexProps) => props.alignItems};
`;

export const Expanded = styled(Flexible) <FlexProps>`
  ${(props: SpacingProps) => SpacingStyle(props)}
  flex-grow: ${(props: FlexProps) => (props.grow ? props.grow : 1)};
`;

export const Container = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  @media ${device.mobile} {
    max-width: 540px;
  }
  @media ${device.tablet} {
    max-width: 720px;
  }
  @media ${device.tabletL} {
    max-width: 960px;
  }
  @media ${device.desktop} {
    max-width: 1140px;
  }
`;
