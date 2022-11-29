import React from "react";
import { ScaleLoader } from "react-spinners";
import styled, { useTheme } from "styled-components";
import { Expanded } from "./generic";

interface LoaderInterface {
  height?: string;
  color?: string;
  width?: string;
  radius?: string;
  margin?: string;
}

function Loader(props: LoaderInterface) {
  const theme = useTheme();

  const LoaderDisplay = {
    color: theme.color.primary["400"],
    width: 6,
    height: 50,
    radius: 1,
    margin: 3,
  };

  return (
    <Expanded justifyContent="center" alignItems="center">
      <ScaleLoader
        color={props.color ? props.color : LoaderDisplay.color}
        width={LoaderDisplay.width}
        height={LoaderDisplay.height}
        radius={LoaderDisplay.radius}
        margin={LoaderDisplay.margin}
      />
    </Expanded>
  );
}

export default Loader;

export function ButtonLoader() {
  const theme = useTheme();

  const LoaderDisplay = {
    color: theme.color.grayscale["000"],
    width: 3,
    height: 15,
    radius: 1,
    margin: 1,
  };

  return (
    <Custom>
      <ScaleLoader
        color={LoaderDisplay.color}
        width={LoaderDisplay.width}
        height={LoaderDisplay.height}
        radius={LoaderDisplay.radius}
        margin={LoaderDisplay.margin}
      />
    </Custom>
  );
}

const Custom = styled.div`
  span:first-child {
    display: flex !important;
  }
`;
