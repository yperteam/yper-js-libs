import React from "react";
import styled, { useTheme } from "styled-components";
import Modal, { ModalProvider } from "styled-react-modal";
import { Column, Row } from "@yper-script/react/app/widget/generic";
import { Text } from "@yper-script/react/app/widget/mixins";
import { useRecoilState } from "recoil";
import { DelivererDialogProvider } from "@yper-script/react/app/notifiers/deliverer/deliverer_dialog_notifier";
import { ModalBackground } from "@yper-script/react/app/screen/deliverer/modal/deprecate_shopper_modal";

/** Images */
const closeIcon = "/img/react/deliverer/close_icon.svg";
const validIcon = "/img/react/deliverer/valid_rounded_icon.svg";

function SuccessModal() {
  const theme = useTheme();

  const [modalSuccess, setModalSuccess] = useRecoilState(
    DelivererDialogProvider.dialogDeprecatedSuccessProvider
  );

  return (
    <ModalProvider backgroundComponent={ModalBackground}>
      <ModalContainer
        isOpen={modalSuccess}
        onBackgroundClick={() =>
          setModalSuccess({ show: false, delivererName: "" })
        }
        onEscapeKeydown={() =>
          setModalSuccess({ show: false, delivererName: "" })
        }
      >
        <ModalContent>
          <Row justifyContent={"flex-end"}>
            <Close
              src={closeIcon}
              alt={"close"}
              onClick={() =>
                setModalSuccess({ show: false, delivererName: "" })
              }
            />
          </Row>
          <ModalBody>
            <Column alignItems={"center"}>
              <Logo src={validIcon} alt={"valid_icon"} />
              <Text
                margin={{ top: "10px" }}
                textStyle={theme.textTheme.title.medium.copyWith({
                  color: theme.color.primary["500"],
                })}
              >
                {modalSuccess.delivererName} a été dépriorisé, nous ne le
                solliciterons plus pour réaliser vos livraisons.
              </Text>
            </Column>
          </ModalBody>
        </ModalContent>
      </ModalContainer>
    </ModalProvider>
  );
}

export default SuccessModal;

/** Styled Component */
const ModalContainer = styled(Modal)``;

const ModalContent = styled.div`
  background-color: ${props => props.theme.color.grayscale["000"]};
  max-width: 500px;
  border-radius: 8px;
  padding: 16px;
`;

const ModalBody = styled.div`
  padding: 16px;
  text-align: center;
`;

const Logo = styled.img`
  width: 48px;
  height: 48px;
`;

const Close = styled.img`
  cursor: pointer;
`;
