import React from "react";
import { useTheme } from "styled-components";
import styled from "styled-components";
import Modal, { ModalProvider } from "styled-react-modal";
import { Col, Column, Row } from "@yper-script/react/app/widget/generic";
import { Text } from "@yper-script/react/app/widget/mixins";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "@yper-script/react/app/widget/button";
import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import { DelivererDialogProvider } from "@yper-script/react/app/notifiers/deliverer/deliverer_dialog_notifier";
import { DeprecateDelivererNotifier } from "@yper-script/react/app/notifiers/deliverer/deprecate_deliverer_family_notifier";

/** Images */
const closeIcon = "/img/react/deliverer/close_icon.svg";
const deprecateShopperIcon = "/img/react/deliverer/deprecate_shopper_icon.svg";

function DeprecateShopperModal() {
  const theme = useTheme();

  /** Recoil */
  const [modalDeprecated, setModalDeprecated] = useRecoilState(
    DelivererDialogProvider.dialogDeprecatedProvider
  );

  return (
    <ModalProvider backgroundComponent={ModalBackground}>
      <ModalContainer
        isOpen={modalDeprecated}
        onBackgroundClick={() =>
          setModalDeprecated({ show: false, deliverer: {} })
        }
        onEscapeKeydown={() =>
          setModalDeprecated({ show: false, deliverer: {} })
        }
      >
        <ModalContent>
          <Row justifyContent={"flex-end"}>
            <Close
              src={closeIcon}
              alt={"close"}
              onClick={() => setModalDeprecated({ show: false, deliverer: {} })}
            />
          </Row>
          <ModalBody>
            <Column alignItems={"center"}>
              <Logo src={deprecateShopperIcon} alt={"deprecate_shopper_icon"} />
              <Text
                margin={{ top: "10px" }}
                textStyle={theme.textTheme.title.medium.copyWith({
                  color: theme.color.primary["500"],
                })}
              >
                Êtes-vous sûr de ne plus vouloir solliciter ce livreur ?
              </Text>
              <Text
                margin={{ top: "10px" }}
                textStyle={theme.textTheme.body.medium.copyWith({
                  color: theme.color.primary["300"],
                })}
              >
                Le livreur sera dépriorisé et ne recevra plus de propositions
                pour réaliser vos livraisons. Cette action est seulement
                réversible en contactant le support client.
              </Text>
            </Column>
          </ModalBody>
          <Row direction={"row"}>
            <Col justifyContent={"center"}>
              <ButtonSecondary
                onClick={() =>
                  setModalDeprecated({ show: false, deliverer: {} })
                }
              >
                <Text textStyle={theme.textTheme.label.medium}>Annuler</Text>
              </ButtonSecondary>
              <DeprecateShopper />
            </Col>
          </Row>
        </ModalContent>
      </ModalContainer>
    </ModalProvider>
  );
}

export default DeprecateShopperModal;

function DeprecateShopper() {
  const theme = useTheme();

  const modal = useRecoilValue(
    DelivererDialogProvider.dialogDeprecatedProvider
  );

  const notifier = useRecoilCallback(
    callback => async () => {
      await DeprecateDelivererNotifier.notifier(modal.deliverer, callback);
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
        Déprioriser
      </Text>
    </ButtonPrimary>
  );
}

/** Styled Component */
export const ModalBackground = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 16px;
  z-index: 30;
  background-color: rgba(54, 80, 108, 0.1);
  justify-content: center;
  align-items: center;
  overflow-y: auto;
`;

const ModalContainer = styled(Modal)``;

export const ModalContent = styled.div`
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
