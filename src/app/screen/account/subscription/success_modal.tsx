import React from "react";
import Modal, { ModalProvider } from "styled-react-modal";
import { Column, Row, Spacing } from "@yper-script/react/app/widget/generic";
import { Text } from "@yper-script/react/app/widget/mixins";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "@yper-script/react/app/widget/button";
import { useRecoilState, useRecoilValue } from "recoil";
import styled, { useTheme } from "styled-components";
import { ModalBackground } from "@yper-script/react/app/screen/deliverer/modal/deprecate_shopper_modal";
import { PaymentNotifier } from "@yper-script/react/app/notifiers/subscription/payment_notifier";
import { ProSubscriptionsNotifier } from "@yper-script/react/app/notifiers/subscription/subscription_notifier";
import { getSubscriptionEnd } from "./utils";

/** Images */
const closeIcon = "/img/react/icon/close_icon.svg";
const modalErrorIcon = "/img/react/icon/succes_modal_icon.svg";

function SuccessModal(props: { payedSuccess?: boolean }) {
  const theme = useTheme();
  const [modal, displayModal] = useRecoilState(
    PaymentNotifier.successDialogProvider
  );
  const subscription = useRecoilValue(ProSubscriptionsNotifier.provider)[0];

  return (
    <ModalProvider backgroundComponent={ModalBackground}>
      <ModalContainer
        isOpen={modal}
        onBackgroundClick={() => {
          displayModal(!modal);
          window.location.href = "/account/subscription";
        }}
        onEscapeKeydown={() => {
          displayModal(!modal);
          window.location.href = "/account/subscription";
        }}
        opacity={1}
      >
        <ModalContent>
          <Column alignItems={"flex-end"}>
            <Close
              src={closeIcon}
              alt={"close"}
              onClick={() => {
                displayModal(!modal);
                window.location.href = "/account/subscription";
              }}
            />
          </Column>
          <Column alignItems={"center"}>
            <Spacing margin={{ top: "8px", bottom: "8px" }}>
              <img src={modalErrorIcon} alt={"error"} />
            </Spacing>
            <Text
              textStyle={theme.textTheme.title.medium.copyWith({
                color: theme.color.primary["500"],
              })}
            >
              {props.payedSuccess == false
                ? "Votre changement d'offre est enregistré"
                : "Merci pour votre achat !"}
            </Text>
            <Text
              margin={{ top: "8px" }}
              textAlign={"center"}
              textStyle={theme.textTheme.body.medium.copyWith({
                color: theme.color.primary["300"],
              })}
            >
              {props.payedSuccess == false
                ? `Votre offre actuelle prendra fin le ${getSubscriptionEnd(
                    subscription
                  ).format(
                    "DD/MM/YYYY"
                  )}, et votre nouvelle offre démarrera automatiquement à la suite.`
                : "Votre paiement a été accepté. Votre changement d'offre est enregistré et effectif dès maintenant."}
            </Text>
            <ButtonRow justifyContent={"space-around"}>
              <ButtonSecondary
                onClick={() => {
                  displayModal(!modal);
                  window.location.replace("/account/subscription");
                }}
              >
                <Text textStyle={theme.textTheme.label.medium}>
                  Retour à Mon compte
                </Text>
              </ButtonSecondary>
              <Spacing margin={{ left: "8px" }} />
              <ButtonPrimary
                onClick={() => {
                  displayModal(!modal);
                  window.location.replace("/order");
                }}
              >
                <Text
                  textStyle={theme.textTheme.label.medium.copyWith({
                    color: theme.color.grayscale["000"],
                  })}
                >
                  Réserver une livraison
                </Text>
              </ButtonPrimary>
            </ButtonRow>
          </Column>
        </ModalContent>
      </ModalContainer>
    </ModalProvider>
  );
}

export default SuccessModal;

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
  min-width: 300px;
  border-radius: 8px;
  padding: 16px 16px 24px;
`;

const ButtonRow = styled(Row)`
  margin-top: 24px;
`;

const Close = styled.img`
  cursor: pointer;
  width: 16px;
`;
