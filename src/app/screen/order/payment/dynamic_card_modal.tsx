import React from "react";
import Modal, { ModalProvider } from "styled-react-modal";
import { Column, Row, Spacing } from "@yper-script/react/app/widget/generic";
import { Text } from "@yper-script/react/app/widget/mixins";
import { ButtonPrimary } from "@yper-script/react/app/widget/button";
import { atom, useRecoilState } from "recoil";
import { ModalBackground } from "@yper-script/react/app/screen/deliverer/modal/deprecate_shopper_modal";
import styled, { useTheme } from "styled-components";

/** Images */
const closeIcon = "/img/react/icon/close_icon.svg";
const modalIcon = "/img/react/icon/ic_information_circle.svg";

export const provider = atom<boolean>({
  key: "dynamic_card_modal",
  default: false,
});

export function DynamicCardModal() {
  const theme = useTheme();
  const [modal, displayModal] = useRecoilState(provider);

  return (
    <ModalProvider backgroundComponent={ModalBackground}>
      <ModalContainer
        isOpen={modal}
        onBackgroundClick={() => displayModal(!modal)}
        onEscapeKeydown={() => displayModal(!modal)}
        opacity={1}
      >
        <ModalContent>
          <Column alignItems={"flex-end"}>
            <Close
              src={closeIcon}
              alt={"close"}
              onClick={() => displayModal(!modal)}
            />
          </Column>
          <Column alignItems={"center"}>
            <InfoSpacing
              margin={{ top: "8px", bottom: "8px" }}
              padding={{ top: "8px", bottom: "8px", left: "8px", right: "8px" }}
            >
              <img src={modalIcon} />
            </InfoSpacing>
            <Text
              textStyle={theme.textTheme.title.medium.copyWith({
                color: theme.color.primary["500"],
              })}
            >
              Cryptogramme dynamique
            </Text>
            <Text
              margin={{ top: "8px" }}
              textAlign={"center"}
              textStyle={theme.textTheme.body.medium.copyWith({
                color: theme.color.primary["300"],
              })}
            >
              Si vous avez une carte bancaire à cryptogramme dynamique, vous
              devez sélectionner “Ajouter un moyen de paiement” et renseigner
              les coordonnées bancaires comme s'il s'agissait d'une toute
              nouvelle carte
            </Text>
            <ButtonRow>
              <ButtonPrimary onClick={() => displayModal(!modal)}>
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

const InfoSpacing = styled(Spacing)`
  border-radius: 24px;
  background-color: ${props => props.theme.color.primary["100"]};
`;
