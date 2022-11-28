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
const validIcon = "/img/react/deliverer/valid_rounded_icon.svg";

function FavoriteModal() {
  const theme = useTheme();

  /** Recoil */
  const [modal, setModal] = useRecoilState(
    DelivererDialogProvider.dialogFavoriteProvider
  );

  return (
    <ModalProvider backgroundComponent={ModalBackground}>
      <ModalContainer
        isOpen={modal}
        onBackgroundClick={() =>
          setModal({ show: false, delivererName: "", type: "" })
        }
        onEscapeKeydown={() =>
          setModal({ show: false, delivererName: "", type: "" })
        }
      >
        <ModalContent>
          <Row justifyContent={"flex-end"}>
            <Close
              src={closeIcon}
              alt={"close"}
              onClick={() =>
                setModal({ show: false, delivererName: "", type: "" })
              }
            />
          </Row>
          <ModalBody>
            <Column alignItems={"center"}>
              <Logo src={validIcon} alt={"valid_icon"} />
              {modal.type === "add" ? (
                <Text
                  margin={{ top: "10px" }}
                  textStyle={theme.textTheme.title.medium.copyWith({
                    color: theme.color.primary["500"],
                  })}
                >
                  {modal.delivererName} a été ajouté à vos favoris, nous le
                  solliciterons en priorité pour effectuer vos livraisons.
                </Text>
              ) : (
                <Text
                  margin={{ top: "10px" }}
                  textStyle={theme.textTheme.title.medium.copyWith({
                    color: theme.color.primary["500"],
                  })}
                >
                  {modal.delivererName} a été retiré de vos favoris, nous ne le
                  solliciterons plus en priorité pour effectuer vos livraisons.
                </Text>
              )}
            </Column>
          </ModalBody>
        </ModalContent>
      </ModalContainer>
    </ModalProvider>
  );
}

export default FavoriteModal;

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
