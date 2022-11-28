import React from "react";
import styled, { useTheme } from "styled-components";
import Modal, { ModalProvider } from "styled-react-modal";
import { Col, Column, Row } from "@yper-script/react/app/widget/generic";
import { Text } from "@yper-script/react/app/widget/mixins";
import { useRecoilState } from "recoil";
import { DelivererDialogProvider } from "@yper-script/react/app/notifiers/deliverer/deliverer_dialog_notifier";
import { ModalBackground } from "@yper-script/react/app/screen/deliverer/modal/deprecate_shopper_modal";

/** Images */
const closeIcon = "/img/react/deliverer/close_icon.svg";
const warningRoundedIcon = "/img/react/deliverer/warning_rounded_icon.svg";

function CancelDeprecateShopperModal() {
  const theme = useTheme();

  /** Recoil */
  const [modalDeprecated, setModalDeprecated] = useRecoilState(
    DelivererDialogProvider.dialogCancelDeprecatedProvider
  );

  return (
    <ModalProvider backgroundComponent={ModalBackground}>
      <ModalContainer
        isOpen={modalDeprecated}
        onBackgroundClick={() => setModalDeprecated(false)}
        onEscapeKeydown={() => setModalDeprecated(false)}
      >
        <ModalContent>
          <Row justifyContent={"flex-end"}>
            <Col>
              <Close
                src={closeIcon}
                alt={"close"}
                onClick={() => setModalDeprecated(false)}
              />
            </Col>
          </Row>
          <ModalBody>
            <Column alignItems={"center"}>
              <Logo src={warningRoundedIcon} alt={"warning_rounded_icon"} />
              <Text
                margin={{ top: "10px" }}
                textStyle={theme.textTheme.title.medium.copyWith({
                  color: theme.color.primary["500"],
                })}
              >
                Contactez Yper
              </Text>
              <Text
                margin={{ top: "10px" }}
                textStyle={theme.textTheme.body.medium.copyWith({
                  color: theme.color.primary["300"],
                })}
              >
                Pour annuler la dépriorisation, veuillez contacter Yper.
              </Text>
            </Column>
          </ModalBody>
        </ModalContent>
      </ModalContainer>
    </ModalProvider>
  );
}

export default CancelDeprecateShopperModal;

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
