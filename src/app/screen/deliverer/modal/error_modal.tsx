import React from "react";
import styled, { useTheme } from "styled-components";
import Modal, { ModalProvider } from "styled-react-modal";
import {
  Col,
  Column,
  Flexible,
  Row,
} from "@yper-script/react/app/widget/generic";
import { Text } from "@yper-script/react/app/widget/mixins";
import { ButtonPrimary } from "@yper-script/react/app/widget/button";
import { ModalBackground } from "@yper-script/react/app/screen/deliverer/modal/deprecate_shopper_modal";
import { useRecoilState } from "recoil";
import { DelivererDialogProvider } from "@yper-script/react/app/notifiers/deliverer/deliverer_dialog_notifier";

/** Enum */
export enum DelivererErrorEnum {
  dislike = "dislike",
  like = "like",
  deprecate = "deprecate",
}

/** Images */
const closeIcon = "/img/react/deliverer/close_icon.svg";
const alertIcon = "/img/react/deliverer/alert_circle_icon.svg";

function ErrorModal() {
  const theme = useTheme();

  const [errorModal, displayErrorModal] = useRecoilState(
    DelivererDialogProvider.dialogErrorProvider
  );

  return (
    <ModalProvider backgroundComponent={ModalBackground}>
      <ModalContainer
        isOpen={errorModal.show}
        onBackgroundClick={() =>
          displayErrorModal({ show: false, type: "default" })
        }
        onEscapeKeydown={() =>
          displayErrorModal({ show: false, type: "default" })
        }
      >
        <ModalContent>
          <Row justifyContent={"flex-end"}>
            <Col>
              <Close
                src={closeIcon}
                alt={"close"}
                onClick={() =>
                  displayErrorModal({ show: false, type: "default" })
                }
              />
            </Col>
          </Row>
          <ModalBody>
            <Column alignItems={"center"}>
              <Logo src={alertIcon} alt={"alert_rounded_icon"} />
              <ModalErrorContent type={errorModal.type} />
              <Row margin={{ top: "15px" }} direction={"row"}>
                <Flexible justifyContent={"center"}>
                  <ButtonPrimary
                    margin={{ left: "15px" }}
                    onClick={() =>
                      displayErrorModal({ show: false, type: "default" })
                    }
                  >
                    <Text
                      textStyle={theme.textTheme.label.medium.copyWith({
                        color: theme.color.grayscale["000"],
                      })}
                    >
                      Ok, j’ai compris
                    </Text>
                  </ButtonPrimary>
                </Flexible>
              </Row>
            </Column>
          </ModalBody>
        </ModalContent>
      </ModalContainer>
    </ModalProvider>
  );
}

export default ErrorModal;

function ModalErrorContent(props: { type: string }) {
  const theme = useTheme();

  let title = "L’action n’a pas pu être effectuée";

  switch (props.type) {
    case DelivererErrorEnum.dislike:
      title = "Le livreur n’a pas pu être retiré des favoris";
      break;
    case DelivererErrorEnum.like:
      title = "Le livreur n’a pas pu être ajouté aux favoris";
      break;
    case DelivererErrorEnum.deprecate:
      title = "Le livreur n’a pas pu être dépriorisé";
      break;
  }

  return (
    <>
      <Col className={"mt-2"}>
        <Text
          textStyle={theme.textTheme.title.medium.copyWith({
            color: theme.color.primary["500"],
          })}
        >
          {title}
        </Text>
      </Col>
      <Col className={"mt-2"}>
        <Text
          textStyle={theme.textTheme.body.medium.copyWith({
            color: theme.color.primary["300"],
          })}
        >
          Une erreur est survenue, désolés pour la gêne occasionnée ! Nous vous
          conseillons de réessayer dans quelques minutes.
        </Text>
      </Col>
    </>
  );
}

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
