import styled, { DefaultTheme } from "styled-components";
import { TextStyleClass } from "./theme";
import SVG from "react-inlinesvg";
import {
  SpacingProps,
  SpacingStyle,
} from "./generic";

export interface TextInterface extends SpacingProps {
  textStyle?: TextStyleClass;
  theme?: DefaultTheme;
  textAlign?: string;
}

export interface LabelInterface extends TextInterface {
  for?: string;
}

export const Text = styled.p<TextInterface>`
  ${(props: SpacingProps) => SpacingStyle(props)}
  text-align: ${(props: TextInterface) => props.textAlign};
  font-style: ${(props: TextInterface) =>
    props.textStyle ? props.textStyle.style : "normal"};
  font-family: ${(props: TextInterface) =>
    props.textStyle
      ? props.textStyle.font.family
      : props.theme?.textTheme.body.medium.font.family},
    ${(props: TextInterface) =>
    props.textStyle
      ? props.textStyle.font.generic
      : props.theme?.textTheme.body.medium.font.generic};
  font-weight: ${(props: TextInterface) =>
    props.textStyle
      ? props.textStyle.font.weight
      : props.theme?.textTheme.body.medium.font.weight};
  font-size: ${(props: TextInterface) =>
    props.textStyle
      ? props.textStyle.font.size
      : props.theme?.textTheme.body.medium.font.size};
  line-height: ${(props: TextInterface) =>
    props.textStyle
      ? props.textStyle.lineHeight
      : props.theme?.textTheme.body.medium.lineHeight};
  letter-spacing: ${(props: TextInterface) =>
    props.textStyle
      ? props.textStyle.letterSpacing
      : props.theme?.textTheme.body.medium.letterSpacing};
  color: ${(props: TextInterface) =>
    props.textStyle
      ? props.textStyle.color
      : props.theme?.textTheme.body.medium.color};
`;


export const Label = styled.label<LabelInterface>`
  margin: 0;
  height: auto !important;
  font-family: ${(props: TextInterface) =>
    props.textStyle
      ? props.textStyle.font.family
      : props.theme?.textTheme.label.small.font.family},
    ${(props: TextInterface) =>
    props.textStyle
      ? props.textStyle.font.generic
      : props.theme?.textTheme.label.small.font.generic};
  font-weight: ${(props: TextInterface) =>
    props.textStyle
      ? props.textStyle.font.weight
      : props.theme?.textTheme.label.small.font.weight};
  font-size: ${(props: TextInterface) =>
    props.textStyle
      ? props.textStyle.font.size
      : props.theme?.textTheme.label.small.font.size};
  line-height: ${(props: TextInterface) =>
    props.textStyle
      ? props.textStyle.lineHeight
      : props.theme?.textTheme.label.small.lineHeight};
  letter-spacing: ${(props: TextInterface) =>
    props.textStyle
      ? props.textStyle.letterSpacing
      : props.theme?.textTheme.label.small.letterSpacing};
  color: ${(props: TextInterface) =>
    props.textStyle
      ? props.textStyle.color
      : props.theme?.textTheme.label.small.color};
  text-transform: initial; // TODO remove this when we disable current css rules
`;

export const Icon = styled.i<TextInterface>`
  .material-icons {
    font-size: 20px;
  }
`;

// TODO use svg instead of this
export const MaterialIcon = styled.i.attrs(props => ({
  className: "material-icons",
})) <{ name: string; color?: string }>`
  font-size: 20px;
  color: ${props => props.color ?? props.theme?.color.primary[400]};
  &:before {
    content: '${props => props.name}';
  }
`;

type SvgPictureProps = SpacingProps & {
  color?: string;
  width?: string;
  height?: string;
};

export const SvgPicture = styled(SVG) <SvgPictureProps>`
  ${(props: SpacingProps) => SpacingStyle(props)}
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  & path, rect {
    fill: ${({ color }) => color};
  }
`;

export const BoldText = styled.span`
  font-weight: 700;
`;
