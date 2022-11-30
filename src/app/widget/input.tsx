import styled, { css } from "styled-components";
import { TextInterface } from "./mixins";
import {
  Col,
  SpacingProps,
  SpacingStyle,
  ColProps,
} from "./generic";

export const FormContainer = styled(Col) <{ bgColor?: string }>`
  padding: 24px 28px 32px;
  width: 50%;
  ${props =>
    props.bgColor &&
    css`
      background-color: ${props.bgColor};
    `}
`;

type InputProps = SpacingProps & { textAlign?: string };

export const Input = styled.input<InputProps>`
  ${(props: SpacingProps) => SpacingStyle(props)}
  border-radius: 2px;
  min-height: 40px;
  padding: 10px 12px 10px 8px;
  text-align: ${props => props.textAlign};

  &:focus-visible {
    outline: 1px solid ${props => props.theme.color.information["400"]};
  }

  &:disabled {
    background-color: ${props => props.theme.color.grayscale["200"]};
    color: ${props => props.theme.color.primary["300"]} !important;
  }
`;

export const Textarea = styled.textarea`
  min-height: 80px;
  border-radius: 2px;

  &:focus-visible {
    outline: 1px solid ${props => props.theme.color.information["400"]};
  }

  &:disabled {
    background-color: ${props => props.theme.color.grayscale["200"]};
    color: ${props => props.theme.color.primary["300"]} !important;
  }
`;

export const InputLabel = styled.label<TextInterface>`
  margin: 0;
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
  text-transform: lowercase;
  &:first-letter {
    text-transform: uppercase;
  }
`;
