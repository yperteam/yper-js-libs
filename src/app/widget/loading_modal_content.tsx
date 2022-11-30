import React from "react";
import Modal from "styled-react-modal";
import { Column, Spacing } from "./generic";
import { Text } from "./mixins";
import styled, { useTheme } from "styled-components";
import { PulseLoader } from "react-spinners";

function LoadingModalContent() {
  const theme = useTheme();

  return (
    <ModalContent>
      <Column alignItems={"center"}>
        <Spacing margin={{ top: "20px", bottom: "15px" }}>
          <PulseLoader
            size={10}
            margin={2}
            color={theme.color.primary["200"]}
          />
        </Spacing>
        <Text
          margin={{ top: "8px" }}
          textAlign={"center"}
          textStyle={theme.textTheme.title.medium.copyWith({
            color: theme.color.primary["500"],
          })}
        >
          Nous traitons votre paiement,
          <br /> ne quittez pas la page
        </Text>
      </Column>
    </ModalContent>
  );
}

export default LoadingModalContent;

/** Styled Component */
const ModalContent = styled.div`
  background-color: ${props => props.theme.color.grayscale["000"]};
  max-width: 500px;
  min-width: 400px;
  border-radius: 8px;
  padding: 45px 32px 40px;
`;
