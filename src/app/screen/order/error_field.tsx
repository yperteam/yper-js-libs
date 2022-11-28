import React from "react";
import { Text } from "@yper-script/react/app/widget/mixins";
import {
  Col,
  Row,
  Spacing,
  SpacingProps,
  SpacingStyle,
} from "@yper-script/react/app/widget/generic";
import { theme } from "@yper-script/react/app/widget/theme";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";

/** Images */
const deleteCircleIcon = "/img/react/order/delete-circle-full.svg";

//TODO: Generalize customMessage
/** Generic Error Message */
export const customMessage = (type?: string) => {
  return {
    "any.required":
      type == "address"
        ? "Renseignez une adresse de livraison, puis sélectionnez-là dans la liste de suggestions"
        : "Champ obligatoire",
    "string.base": customMessageHandler(type),
    "string.empty": `Champ obligatoire`,
    "object.missing": `Champ obligatoire`,
    "object.base": `Champ obligatoire`,
    "phoneNumber.base": "Format incorrect",
    "string.email": "Format incorrect",
    "number.base": `Format incorrect`,
    "number.min": `Le nombre doit être supérieur ou égal à {#limit}`,
    "number.max": customMessageHandler(type),
    "string.pattern.base": "Format incorrect",
    // TODO remove 
    "any.invalid": "Veuillez cocher cette case",
    "date.format": "Format incorrect",
  };
};

function customMessageHandler(type?: string) {
  switch (type) {
    case "address":
      return "Renseignez une adresse de livraison, puis sélectionnez-là dans la liste de suggestions";
    case "orderMax":
      return "La valeur marchande est trop élevée et ne peut pas être prise en charge par notre service.";
    default:
      return `Champ obligatoire`;
  }
}

function ErrorField(props: { field: string }) {
  const {
    formState: { errors },
  } = useFormContext();
  return (
    <ErrorMessage
      errors={errors}
      name={props.field}
      render={({ message }) => (
        <Row alignItems={"start"}>
          <Img margin={{ right: "5px" }} src={deleteCircleIcon} alt={"error"} />
          <Col justifyContent={"start"}>
            <Text textStyle={theme.textTheme.body.small}>{message}</Text>
          </Col>
        </Row>
      )}
    />
  );
}

export default ErrorField;

const Img = styled.img<any>`
  ${(props: SpacingProps) => SpacingStyle(props)}
`;
