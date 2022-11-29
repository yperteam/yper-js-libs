import styled, { css } from "styled-components";
import { RowProps, SpacingStyle } from "./generic";

const Button = () => css`
  ${(props: RowProps) => {
    props.padding = {
      top: props.padding?.top ?? "8px",
      bottom: props.padding?.bottom ?? "8px",
      right: props.padding?.right ?? "16px",
      left: props.padding?.left ?? "16px",
    };
    return SpacingStyle(props);
  }}
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  height: fit-content;
  width: ${props => props.width ?? "fit-content"};
  cursor: pointer;
  white-space: nowrap;
`;

export const ButtonPrimary = styled.button<RowProps>`
  ${Button()};
  background-color: ${props => props.theme.color.primary["400"]};
  border: 1px solid ${props => props.theme.color.grayscale["400"]};

  p {
    color: ${props => props.theme.color.grayscale["000"]};
  }

  &:hover {
    background-color: ${props => props.theme.color.secondary["400"]};
    border-color: ${props => props.theme.color.secondary["400"]};
  }

  &:focus {
    box-shadow: 0 0 0 3px ${props => props.theme.color.secondary["300"]};
  }
`;

export const ButtonSecondary = styled.button<RowProps>`
  ${Button()};
  background-color: ${props => props.theme.color.transparent};
  border: none;

  p {
    color: ${props => props.theme.color.primary["400"]};
  }

  &:hover {
    background-color: ${props => props.theme.color.secondary["200"]};
  }

  &:focus {
    box-shadow: 0 0 0 3px ${props => props.theme.color.secondary["300"]};
  }
`;

export const ButtonOutlined = styled.button<RowProps>`
  ${Button()};
  color: ${props => props.theme.color.primary["400"]};
  background-color: ${props => props.theme.color.transparent};
  border: 1px solid ${props => props.theme.color.primary["200"]};

  &:hover {
    background-color: ${props => props.theme.color.secondary["200"]};
    border-color: ${props => props.theme.color.secondary["400"]};
  }

  &:focus {
    box-shadow: 0 0 0 3px ${props => props.theme.color.primary["400"]};
  }
`;

export const TextButton = styled.button<RowProps>`
  ${Button()};
  color: ${props => props.theme.color.primary["400"]};
  background-color: ${props => props.theme.color.transparent};
  border: none;

  &:hover {
    background-color: ${props => props.theme.color.secondary["200"]};
  }

  &:focus {
    box-shadow: 0 0 0 3px ${props => props.theme.color.primary["400"]};
  }
`;

export const ButtonFullWidth = styled.button<RowProps>`
  ${Button()};
  align-items: center;
  background-color: ${props => props.theme.color.secondary["400"]};
  border: inherit;
  font-size: 14px;
  min-width: 220px;
  transition: all 0.4s ease-in-out;

  &:hover {
    box-shadow: 0 0 10px ${props => props.theme.color.secondary["300"]};
    svg path {
      fill: ${props => props.theme.color.grayscale["000"]};
    }
    p {
      color: ${props => props.theme.color.grayscale["000"]};
    }
  }
`;
