import React from "react";
import Modal, { ModalProvider } from "styled-react-modal";
import { Column, Row, Spacing } from "@yper-script/react/app/widget/generic";
import { Text } from "@yper-script/react/app/widget/mixins";
import { ButtonPrimary } from "@yper-script/react/app/widget/button";
import { useRecoilState } from "recoil";
import { ModalBackground } from "@yper-script/react/app/screen/deliverer/modal/deprecate_shopper_modal";
import { ErrorModalNotifier } from "@yper-script/react/app/notifiers/error_modal_notifier";
import styled, { useTheme } from "styled-components";

/** Images */
const closeIcon = "/img/react/icon/close_icon.svg";
const modalErrorIcon = "/img/react/icon/modal_error_icon.svg";

function ErrorModal() {
  const theme = useTheme();
  const [modal, displayModal] = useRecoilState(
    ErrorModalNotifier.dialogProvider
  );

  return (
    <ModalProvider backgroundComponent={ModalBackground}>
      <ModalContainer
        isOpen={modal.display}
        onBackgroundClick={() => displayModal(!modal.display)}
        onEscapeKeydown={() => displayModal(!modal.display)}
        opacity={1}
      >
        <ModalContent>
          <Column alignItems={"flex-end"}>
            <Close
              src={closeIcon}
              alt={"close"}
              onClick={() => displayModal(!modal.display)}
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
              {modal.message && modal.message.title
                ? modal.message.title
                : "Une erreur est survenue"}
            </Text>
            <Text
              margin={{ top: "8px" }}
              textAlign={"center"}
              textStyle={theme.textTheme.body.medium.copyWith({
                color: theme.color.primary["300"],
              })}
            >
              {modal.message && modal.message.description
                ? modal.message.description
                : "Nous sommes désolés, cette action a échoué. Merci de bien vouloir patienter et réessayer dans quelques instants."}
            </Text>
            <ButtonRow>
              <ButtonPrimary onClick={() => displayModal(!modal.display)}>
                <Text
                  textStyle={theme.textTheme.label.medium.copyWith({
                    color: theme.color.grayscale["000"],
                  })}
                >
                  Ok, j'ai compris
                </Text>
              </ButtonPrimary>
            </ButtonRow>
          </Column>
        </ModalContent>
      </ModalContainer>
    </ModalProvider>
  );
}

export default ErrorModal;

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
