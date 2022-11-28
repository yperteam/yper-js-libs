import React, { useEffect } from "react";
import Modal, { ModalProvider } from "styled-react-modal";
import { Column, Row } from "@yper-script/react/app/widget/generic";
import { MaterialIcon, Text } from "@yper-script/react/app/widget/mixins";
import { useRecoilValue, useSetRecoilState, useRecoilCallback } from "recoil";
import styled, { useTheme } from "styled-components";
import { PaymentNotifier } from "@yper-script/react/app/notifiers/subscription/payment_notifier";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "@yper-script/react/app/widget/button";
import { ModalBackground } from "@yper-script/react/app/screen/deliverer/modal/deprecate_shopper_modal";
import { ChangeSubscriptionNotifier } from "@yper-script/react/app/notifiers/subscription/change_subscription_notifier";
import { ErrorModalNotifier } from "@yper-script/react/app/notifiers/error_modal_notifier";
import { ButtonLoader } from "@yper-script/react/app/widget/loader";
import { DeletePaymentMethodNotifier } from "@yper-script/react/app/notifiers/payment_method/delete_payment_method_notifier";

/** Images */
const closeIcon = "/img/react/icon/close_icon.svg";

function DeletePaymentModal(props: { methodId: string }) {
  const theme = useTheme();
  const displayModal = useSetRecoilState(PaymentNotifier.deleteDialogProvider);
  const loadable = useRecoilValue(ChangeSubscriptionNotifier.provider);
  const errorModal = useSetRecoilState(ErrorModalNotifier.dialogProvider);

  useEffect(() => {
    if (loadable?.state == "hasError") {
      displayModal(false);
      errorModal({ display: true });
    }
  }, [loadable]);

  return (
    <ModalProvider backgroundComponent={ModalBackground}>
      <ModalContainer
        isOpen={true}
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
            <>
              <Text
                textAlign={"center"}
                textStyle={theme.textTheme.title.medium.copyWith({
                  color: theme.color.primary["500"],
                })}
              >
                Êtes-vous sûr de vouloir supprimer ce moyen de paiement ?
              </Text>
              <Text
                margin={{ top: "8px" }}
                textAlign={"center"}
                textStyle={theme.textTheme.body.medium.copyWith({
                  color: theme.color.primary["300"],
                })}
              >
                Ce moyen de paiement sera définitivement supprimé.
              </Text>
              <ButtonRow alignItems={"flex-start"}>
                <ButtonSecondary
                  onClick={() => displayModal(false)}
                  margin={{ right: "8px" }}
                >
                  <Text>Non, je le conserve</Text>
                </ButtonSecondary>
                <SubmitButton methodId={props.methodId} />
              </ButtonRow>
            </>
          </ModalBody>
        </ModalContent>
      </ModalContainer>
    </ModalProvider>
  );
}

export default DeletePaymentModal;

function SubmitButton({ methodId }: { methodId: string }) {
  const theme = useTheme();
  const loadable = useRecoilValue(
    DeletePaymentMethodNotifier.provider(methodId)
  );
  const notifier = useRecoilCallback(
    callback => () => {
      DeletePaymentMethodNotifier.notifier(methodId, callback);
    },
    [methodId]
  );

  return (
    <ButtonPrimary onClick={notifier}>
      {loadable?.state != "loading" ? (
        <Text
          textStyle={theme.textTheme.label.medium.copyWith({
            color: theme.color.grayscale["000"],
          })}
        >
          Oui, je supprime
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

  div:first-child {
    margin-left: 0 !important;
  }
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
