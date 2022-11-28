import React from "react";
import styled, { useTheme } from "styled-components";
import {
  Column,
  Row,
  SpacingProps,
  SpacingStyle,
} from "@yper-script/react/app/widget/generic";
import { Text } from "@yper-script/react/app/widget/mixins";
import { ButtonPrimary } from "@yper-script/react/app/widget/button";

/** Icons */
const errorIcon = "/img/react/deliverer/error_icon.svg";

function DelivererError() {
  const theme = useTheme();

  return (
    <Container margin={{ top: "30px" }} className={"mt-3"}>
      <Column alignItems={"center"}>
        <ImgCustom src={errorIcon} alt={"error_icon"} />
        <Text
          margin={{ top: "5px" }}
          textAlign={"center"}
          textStyle={theme.textTheme.title.medium}
        >
          Une erreur est survenue
        </Text>
        <Text
          margin={{ top: "10px" }}
          textAlign={"center"}
          textStyle={theme.textTheme.body.medium}
        >
          Nous n’avons pas réussi à afficher les livreurs de cette catégorie.
          <br /> Veuillez patienter quelques instants, puis essayez d’actualiser
          la page.
        </Text>
      </Column>
      <Row
        margin={{ top: "20px" }}
        justifyContent={"center"}
        className={"mt-3"}
      >
        <ButtonPrimary className={"m-auto"} onClick={() => location.reload()}>
          <Text
            textStyle={theme.textTheme.label.medium.copyWith({
              color: theme.color.grayscale["000"],
            })}
          >
            Actualiser la page
          </Text>
        </ButtonPrimary>
      </Row>
    </Container>
  );
}

export default DelivererError;

/** Styled Component */
const Container = styled.div`
  ${(props: SpacingProps) => SpacingStyle(props)}
  background-color: ${props => props.theme.color.primary["100"]};
  border-radius: 8px;
  padding: 32px;
`;

const ImgCustom = styled.img`
  height: 48px;
  width: 48px;
`;
