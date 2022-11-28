import React from "react";
import Modal, { ModalProvider } from "styled-react-modal";
import {
  Column,
  Flexible,
  Row,
  Spacing,
} from "@yper-script/react/app/widget/generic";
import { MaterialIcon, Text } from "@yper-script/react/app/widget/mixins";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "@yper-script/react/app/widget/button";
import { useRecoilState, useRecoilValue } from "recoil";
import styled, { useTheme } from "styled-components";
import { PaymentNotifier } from "@yper-script/react/app/notifiers/subscription/payment_notifier";
import { ProSubscriptionsNotifier } from "@yper-script/react/app/notifiers/subscription/subscription_notifier";
import { useTranslation } from "react-i18next";
import { ModalBackground } from "@yper-script/react/app/screen/deliverer/modal/deprecate_shopper_modal";

/** Images */
const closeIcon = "/img/react/icon/close_icon.svg";
const modalErrorIcon = "/img/react/icon/ic_question_help_message.svg";

function DowngradeModal(props: {
  notifier: () => void;
  newSubscription: string;
}) {
  const theme = useTheme();
  const [modal, displayModal] = useRecoilState(
    PaymentNotifier.downgradeDialogProvider
  );
  const subscription = useRecoilValue(ProSubscriptionsNotifier.provider)[0];
  const { t } = useTranslation([], { keyPrefix: "commercial_offers" });

  const newList = t(`${props.newSubscription}.advantages`, {
    returnObjects: true,
  });
  const newAdvantages = typeof newList == "string" ? [] : newList;
  const list = t(`${subscription.name}.advantages`, { returnObjects: true });
  const advantages = typeof list == "string" ? [] : list;
  const filteredAdvantages = advantages.filter(
    a => newAdvantages.find(newA => newA.title === a.title) == undefined
  );

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
            <Spacing margin={{ top: "8px", bottom: "8px" }}>
              <img src={modalErrorIcon} alt={"error"} width={48} height={48} />
            </Spacing>
            <Text
              textStyle={theme.textTheme.title.medium.copyWith({
                color: theme.color.primary["500"],
              })}
            >
              Êtes-vous sûr de vouloir changer d'offre ?
            </Text>
            <Text
              margin={{ top: "8px" }}
              textAlign={"center"}
              textStyle={theme.textTheme.body.medium.copyWith({
                color: theme.color.primary["400"],
              })}
            >
              En confirmant votre changement d'offre, vous perdrez les avantages
              suivants :
            </Text>
            <Row>
              <Flexible size={1} />
              <Flexible size={8}>
                <Advantages
                  padding={{
                    top: "8px",
                    bottom: "16px",
                    right: "40px",
                    left: "40px",
                  }}
                  margin={{ top: "4px" }}
                >
                  {filteredAdvantages?.map(advantage => (
                    <div key={advantage.title}>
                      <Row justifyContent="start" margin={{ top: "8px" }}>
                        <MaterialIcon
                          color={theme.color.warning["400"]}
                          name="cancel"
                        />
                        <Text
                          margin={{ left: "4px" }}
                          textStyle={theme.textTheme.body.medium.copyWith({
                            color: theme.color.primary["400"],
                          })}
                        >
                          {advantage.title}
                        </Text>
                      </Row>
                    </div>
                  ))}
                </Advantages>
              </Flexible>
              <Flexible size={1} />
            </Row>
            <ButtonRow justifyContent={"space-around"}>
              <ButtonSecondary onClick={() => displayModal(!modal)}>
                <Text textStyle={theme.textTheme.label.medium}>
                  Garder mes avantages
                </Text>
              </ButtonSecondary>
              <Spacing margin={{ left: "8px" }} />
              <ButtonPrimary
                onClick={() => {
                  displayModal(!modal);
                  props.notifier();
                }}
              >
                <Text
                  textStyle={theme.textTheme.label.medium.copyWith({
                    color: theme.color.grayscale["000"],
                  })}
                >
                  Confirmer
                </Text>
              </ButtonPrimary>
            </ButtonRow>
          </Column>
        </ModalContent>
      </ModalContainer>
    </ModalProvider>
  );
}

export default DowngradeModal;

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

const Advantages = styled(Column)`
  background: ${props => props.theme.color.warning["100"]};
`;
