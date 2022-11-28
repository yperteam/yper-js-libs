import React from "react";
import { useTheme } from "styled-components";
import styled from "styled-components";
import Modal, { ModalProvider } from "styled-react-modal";
import { Column, Row, Spacing } from "@yper-script/react/app/widget/generic";
import { Text } from "@yper-script/react/app/widget/mixins";
import { FieldValues, useForm, UseFormHandleSubmit } from "react-hook-form";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "@yper-script/react/app/widget/button";
import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import { InvoiceNotifier } from "@yper-script/react/app/notifiers/invoice/invoice_notifier";
import { InvoiceEmailNotifier } from "@yper-script/react/app/notifiers/invoice/invoice_email_notifier";
import { ModalBackground } from "@yper-script/react/app/screen/deliverer/modal/deprecate_shopper_modal";
import { joiResolver } from "@hookform/resolvers/joi";
import { ErrorMessage } from "@hookform/error-message";
import Joi from "joi";
import { Label } from "@yper-script/react/app/widget/input";

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "any.required": `Ce champ est obligatoire`,
      "string.base": `Ce champ est obligatoire`,
      "string.empty": `Ce champ est obligatoire`,
      "string.email": `Cette adresse n'est pas valide`,
    }),
});

/** Images */
const closeIcon = "/img/react/icon/close_icon.svg";

// TODO add default pro email as input
export function InvoiceEmailDialog() {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onSubmit",
    resolver: joiResolver(schema),
  });
  const [modalEmail, setModelEmail] = useRecoilState(
    InvoiceEmailNotifier.dialogProvider
  );
  const selected = useRecoilValue(InvoiceNotifier.selectedProvider);
  const selectedNb = selected.length;

  return (
    <ModalProvider backgroundComponent={ModalBackground}>
      <ModalContainer
        isOpen={modalEmail}
        onBackgroundClick={() => setModelEmail(!modalEmail)}
        onEscapeKeydown={() => setModelEmail(!modalEmail)}
        opacity={1}
      >
        <ModalContent>
          <form onSubmit={handleSubmit(_ => {})}>
            <Column alignItems={"center"}>
              <Row width="100%" justifyContent={"flex-end"}>
                <Close
                  src={closeIcon}
                  alt={"close"}
                  onClick={() => setModelEmail(!modalEmail)}
                />
              </Row>
              <Text textStyle={theme.textTheme.title.small}>
                Envoyer les factures par mail
              </Text>
              <Title
                textStyle={theme.textTheme.title.large.copyWith({
                  color: theme.color.primary["500"],
                })}
              >
                {selectedNb} facture{selectedNb > 1 ? "s" : ""} selectionnée
                {selectedNb > 1 ? "s" : ""}
              </Title>
              <Spacing margin={{ right: "16px" }}>
                <InputContainer>
                  <Label
                    textStyle={theme.textTheme.body.small.copyWith({
                      color: theme.color.primary["300"],
                    })}
                  >
                    Adresse mail
                  </Label>
                  <Input {...register("email", { required: true })} />
                  <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ message }) => (
                      <Text
                        textStyle={theme.textTheme.body.small.copyWith({
                          color: theme.color.error[400],
                        })}
                      >
                        {message}
                      </Text>
                    )}
                  />
                </InputContainer>
              </Spacing>
              <ButtonRow>
                <ButtonSecondary onClick={() => setModelEmail(!modalEmail)}>
                  <Text textStyle={theme.textTheme.label.medium}>
                    Modifier la selection
                  </Text>
                </ButtonSecondary>
                <SubmitButton handleSubmit={handleSubmit} />
              </ButtonRow>
            </Column>
          </form>
        </ModalContent>
      </ModalContainer>
    </ModalProvider>
  );
}

function SubmitButton(props: {
  handleSubmit: UseFormHandleSubmit<FieldValues>;
}) {
  const theme = useTheme();
  const selected = useRecoilValue(InvoiceNotifier.selectedProvider);
  const notifier = useRecoilCallback(
    callback => async () => {
      props.handleSubmit(
        data => InvoiceEmailNotifier.notifier(data.email, selected, callback),
        error => {}
      )();
    },
    []
  );

  return (
    <ButtonPrimary onClick={notifier} className={"ml-3"}>
      <Text
        textStyle={theme.textTheme.label.medium.copyWith({
          color: theme.color.grayscale["000"],
        })}
      >
        Envoyer
      </Text>
    </ButtonPrimary>
  );
}

/** Styled Component */
const ModalContainer = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.opacity};
  transition: all 0.3s ease-in-out;
`;

const ModalContent = styled.div`
  background-color: ${props => props.theme.color.grayscale["000"]};
  max-width: 500px;
  border-radius: 8px;
  padding: 32px 48px 32px 48px;
`;

const Title = styled(Text)`
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
`;
const InputContainer = styled(Column)`
  margin-top: 16px;
`;

const Close = styled.img`
  cursor: pointer;
  margin-bottom: 16px;
`;

const Input = styled.input`
  border-radius: 2px;
  min-height: 40px;
  padding: 10px 12px 10px 8px;

  &:focus-visible {
    outline: 1px solid ${props => props.theme.color.information["400"]};
  }
`;

const ButtonRow = styled(Row)`
  margin-top: 2.5rem;
`;
