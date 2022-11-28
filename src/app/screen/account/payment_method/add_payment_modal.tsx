import React, { useEffect, useState } from "react";
import Modal, { ModalProvider } from "styled-react-modal";
import { Column, Flexible, Row } from "@yper-script/react/app/widget/generic";
import {
  Label,
  MaterialIcon,
  Text,
} from "@yper-script/react/app/widget/mixins";
import { useRecoilValue, useSetRecoilState, useRecoilCallback } from "recoil";
import styled, { useTheme } from "styled-components";
import { PaymentNotifier } from "@yper-script/react/app/notifiers/subscription/payment_notifier";
import CardField from "@yper-script/react/app/widget/payment_method/card_field";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  IbanField,
  ibanSchema,
} from "@yper-script/react/app/widget/payment_method/iban_field";
import { theme } from "@yper-script/react/app/widget/theme";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "@yper-script/react/app/widget/button";
import { ModalBackground } from "@yper-script/react/app/screen/deliverer/modal/deprecate_shopper_modal";
import { ErrorModalNotifier } from "@yper-script/react/app/notifiers/error_modal_notifier";
import { AddPaymentMethodNotifier } from "@yper-script/react/app/notifiers/payment_method/add_payment_method_notifier";
import { ButtonLoader } from "@yper-script/react/app/widget/loader";

/** Images */
const closeIcon = "/img/react/icon/close_icon.svg";
const creditCardIcon = "/img/react/icon/credit_card_icon.svg";
const ibanIcon = "/img/react/icon/iban_icon.svg";
const creditCardPaymentIcon = "/img/react/icon/credit_card_payment_icon.svg";
const ibanPaymentIcon = "/img/react/icon/iban_payment_icon.svg";

function AddPaymentModal(props: { title: string }) {
  const theme = useTheme();
  const modal = useRecoilValue(PaymentNotifier.dialogProvider);
  const displayModal = useSetRecoilState(PaymentNotifier.dialogProvider);
  const [paymentType, setPaymentType] = useState("");
  const [usingCard, useCard] = useState(false);
  const loadable = useRecoilValue(AddPaymentMethodNotifier.provider);
  const errorModal = useSetRecoilState(ErrorModalNotifier.dialogProvider);
  const methods = useForm({
    reValidateMode: "onSubmit",
    resolver: joiResolver(ibanSchema),
  });

  useEffect(() => {
    if (loadable?.state == "hasError") {
      if (loadable.contents.code == "incomplete_number") {
        methods.setError("card", { message: "Numéro de carte incomplet" });
      } else if (loadable.contents.code == "incomplete_iban") {
        methods.setError("iban", {
          message: "L'IBAN que vous avez saisi est incomplet.",
        });
      } else {
        displayModal(false);
        errorModal({ display: true });
      }
    }
  }, [loadable]);

  const selectPayment = paymentType => {
    setPaymentType(paymentType);
    useCard(paymentType === "card");
  };

  return (
    <ModalProvider backgroundComponent={ModalBackground}>
      <ModalContainer
        isOpen={modal}
        onBackgroundClick={() => displayModal(false)}
        onEscapeKeydown={() => displayModal(false)}
        opacity={1}
      >
        <ModalContent>
          <Column alignItems={"flex-end"}>
            <Close
              src={closeIcon}
              alt={"close"}
              onClick={() => displayModal(false)}
            />
          </Column>
          <ModalBody alignItems={"center"}>
            <FormProvider {...methods}>
              {paymentType ? (
                <PaymentOptions
                  usingCard={usingCard}
                  selectPayment={selectPayment}
                />
              ) : (
                <>
                  <Text
                    textAlign={"center"}
                    textStyle={theme.textTheme.title.medium.copyWith({
                      color: theme.color.primary["500"],
                    })}
                  >
                    {props.title}
                  </Text>
                  <Text
                    margin={{ top: "8px" }}
                    textAlign={"center"}
                    textStyle={theme.textTheme.body.medium.copyWith({
                      color: theme.color.primary["300"],
                    })}
                  >
                    Sélectionnez un type de moyen de paiement
                  </Text>
                  <ButtonRow alignItems={"flex-start"}>
                    <PaymentChoice
                      justifyContent={"center"}
                      alignItems={"center"}
                      onClick={() => selectPayment("card")}
                    >
                      <PaymentIcon src={creditCardIcon} alt={"credit card"} />
                      <Text
                        margin={{ top: "10px" }}
                        textStyle={theme.textTheme.body.medium}
                      >
                        Carte bancaire
                      </Text>
                    </PaymentChoice>
                    <PaymentChoice
                      margin={{ left: "16px" }}
                      justifyContent={"center"}
                      alignItems={"center"}
                      onClick={() => selectPayment("iban")}
                    >
                      <PaymentIcon src={ibanIcon} alt={"iban"} />
                      <Text
                        margin={{ top: "10px" }}
                        textAlign={"center"}
                        textStyle={theme.textTheme.body.medium}
                      >
                        Compte bancaire <br />
                        (IBAN)
                      </Text>
                    </PaymentChoice>
                  </ButtonRow>
                </>
              )}
            </FormProvider>
          </ModalBody>
        </ModalContent>
      </ModalContainer>
    </ModalProvider>
  );
}

export default AddPaymentModal;

function PaymentOptions(props: { usingCard: boolean; selectPayment: any }) {
  const handlePrevious = () => {
    props.selectPayment("");
  };

  return (
    <>
      {props.usingCard ? (
        <>
          <PaymentIcon src={creditCardPaymentIcon} alt={"credit Card Icon"} />
          <Text
            textAlign={"center"}
            margin={{ top: "8px" }}
            textStyle={theme.textTheme.title.medium}
          >
            Munissez-vous de votre carte bancaire et remplissez le champ
            ci-dessous
          </Text>
          <PaymentContainer>
            <Label
              textStyle={theme.textTheme.body.small.copyWith({
                color: theme.color.primary["300"],
              })}
            >
              Carte bancaire
            </Label>
            <CardField name="card" />
          </PaymentContainer>
        </>
      ) : (
        <>
          <PaymentIcon src={ibanPaymentIcon} alt={"iban Icon"} />
          <Text
            textAlign={"center"}
            margin={{ top: "8px" }}
            textStyle={theme.textTheme.title.medium}
          >
            Munissez-vous d'un Relevé d'Identité Bancaire et remplissez le champ
            ci-dessous
          </Text>
          <PaymentContainer>
            <IbanField />
          </PaymentContainer>
        </>
      )}
      <ButtonRow justifyContent={"space-around"}>
        <Flexible>
          <ButtonSecondary onClick={() => handlePrevious()}>
            <CustomMaterialIcon name="arrow_backward" />
            <Text
              margin={{ left: "10px" }}
              textStyle={theme.textTheme.label.medium}
            >
              Précédent
            </Text>
          </ButtonSecondary>
        </Flexible>
        <Flexible>
          <SubmitButton usingCard={props.usingCard} />
        </Flexible>
      </ButtonRow>
    </>
  );
}

function SubmitButton(props: { usingCard: boolean }) {
  const theme = useTheme();
  const { handleSubmit } = useFormContext();
  const loadable = useRecoilValue(AddPaymentMethodNotifier.provider);
  const notifier = useRecoilCallback(
    callback => () => {
      if (props.usingCard) {
        AddPaymentMethodNotifier.cardNotifier(callback);
      } else {
        handleSubmit(data =>
          AddPaymentMethodNotifier.ibanNotifier(data.name, data.email, callback)
        )();
      }
    },
    [props.usingCard]
  );

  return (
    <ButtonPrimary onClick={notifier}>
      {loadable?.state != "loading" ? (
        <Text
          textStyle={theme.textTheme.label.medium.copyWith({
            color: theme.color.grayscale["000"],
          })}
        >
          Valider
        </Text>
      ) : (
        <ButtonLoader />
      )}
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

const PaymentContainer = styled.div`
  width: 100%;
  background-color: #f4f7f9;
  padding: 0.5rem;
  margin-top: 1rem;
  margin-left: 1rem;
`;

const PaymentChoice = styled(Column)`
  padding: 20px 4px 8px;
  border: 1px solid ${props => props.theme.color.primary["200"]};
  border-radius: 5px;
  height: 120px;
  cursor: pointer;

  &:hover {
    border: 2px solid ${props => props.theme.color.success["400"]};
  }
`;

const ModalBody = styled(Column)`
  padding: 20px 16px 40px 32px;
`;

const PaymentIcon = styled.img`
  width: 40px;
`;

const ModalContent = styled.div`
  background-color: ${props => props.theme.color.grayscale["000"]};
  max-width: 500px;
  min-width: 300px;
  border-radius: 8px;
  padding-top: 16px;
  padding-right: 16px;
`;

const ButtonRow = styled(Row)`
  margin-top: 16px;
  width: 100%;
`;

const Close = styled.img`
  cursor: pointer;
  width: 16px;
`;

const CustomMaterialIcon = styled(MaterialIcon)`
  max-width: 20px;
  height: 14px;
  font-size: 16px !important;
`;
