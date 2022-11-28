import React from "react";
import { SvgPicture, Text } from "@yper-script/react/app/widget/mixins";
import { Column, Row } from "@yper-script/react/app/widget/generic";
import Modal, { ModalProvider } from "styled-react-modal";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "@yper-script/react/app/widget/button";
import {
  atom,
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from "recoil";
import {
  ModalBackground,
  ModalContent,
} from "../deliverer/modal/deprecate_shopper_modal";
import styled, { useTheme } from "styled-components";
import { OrderPaymentNotifier } from "@yper-script/react/app/notifiers/order/order_payment_notifier";
import LoadingModalContent from "@yper-script/react/app/widget/loading_modal_content";
import { PrebookNotifier } from "@yper-script/react/app/notifiers/order/prebook_notifier";
import { Mission } from "@yper-script/react/data/entity/mission.entity";
import { ProSubscriptionsNotifier } from "@yper-script/react/app/notifiers/subscription/subscription_notifier";
import { ProLimitNotifier } from "@yper-script/react/app/notifiers/pro/pro_limit_notifier";
import { SubscriptionName } from "@yper-script/react/data/entity/subscription.entity";

/** Images */
const CloseIcon = "/img/react/icon/close_icon.svg";
const ShoppingBagIcon = "/img/react/icon/ic_shopping_bag_side.svg";
const CheckIcon = "/img/react/icon/ic_check.svg";

export const provider = atom<boolean>({
  key: "confirm_order_modal_provider",
  default: false,
});

function goToDelivery(deliveryId: string) {
  window.location.replace(`/deliveries/${deliveryId}`);
}

function reorder() {
  window.location.replace(`/order`);
}

export function ConfirmOrderModal(props: {
  orderId: string;
  prebookId: string;
}) {
  const theme = useTheme();
  const [modalConfirm, setModalConfirm] = useRecoilState(provider);
  const reset = useResetRecoilState(
    OrderPaymentNotifier.provider(props.orderId)
  );
  const prebook = useRecoilValue(PrebookNotifier.provider(props.prebookId))
    .contents as Mission;
  const subscription = useRecoilValue(ProSubscriptionsNotifier.provider)[0];
  const limit = useRecoilValue(ProLimitNotifier.provider);
  const state = useRecoilValue(OrderPaymentNotifier.provider(props.orderId));
  const notifier = useRecoilCallback(
    callback => async () =>
      OrderPaymentNotifier.notifier(props.orderId, callback),
    []
  );

  const hasPriceSurplus =
    subscription.name == SubscriptionName.yper_essential &&
    limit.monthlyDeliveryOverchargeThreshold != -1 &&
    limit.totalMonthlyDeliveries > limit.monthlyDeliveryOverchargeThreshold;

  function closeDialog() {
    setModalConfirm(false);
    reset();
  }

  return (
    <ModalProvider backgroundComponent={ModalBackground}>
      <Modal
        isOpen={modalConfirm}
        onBackgroundClick={() => {
          if (state == null) {
            closeDialog();
          }
        }}
        onEscapeKeydown={() => {
          if (state == null) {
            closeDialog();
          }
        }}
        opacity={1}
      >
        {state?.state == "loading" ? (
          <LoadingModalContent />
        ) : state?.state == "hasValue" ? (
          <ModalContent>
            <Column alignItems={"center"}>
              <IconBorder>
                <SvgPicture
                  src={CheckIcon}
                  height="24px"
                  width="24px"
                  color={theme.color.primary[400]}
                />
              </IconBorder>
              <Text
                textStyle={theme.textTheme.title.medium}
                margin={{ top: "8px" }}
              >
                Merci pour votre réservation
              </Text>
              <Text
                textStyle={theme.textTheme.body.medium}
                margin={{ top: "8px" }}
                textAlign="center"
              >
                C'est bien enregistré, nous recherchons un livreur disponible
                pour la réaliser !
              </Text>
              <Row margin={{ top: "16px" }}>
                <ButtonSecondary onClick={() => goToDelivery(props.prebookId)}>
                  <Text textStyle={theme.textTheme.label.medium}>
                    Suivre ma réservation
                  </Text>
                </ButtonSecondary>
                <ButtonPrimary margin={{ left: "16px" }} onClick={reorder}>
                  <Text textStyle={theme.textTheme.label.medium}>
                    Nouvelle réservation
                  </Text>
                </ButtonPrimary>
              </Row>
            </Column>
          </ModalContent>
        ) : state?.state == "hasError" ? (
          <ButtonSecondary onClick={() => closeDialog()}>
            <Text textStyle={theme.textTheme.label.medium}>Modifier</Text>
          </ButtonSecondary>
        ) : (
          <ModalContent>
            <Column alignItems={"center"}>
              <Row width="100%" justifyContent={"flex-end"}>
                <Close
                  src={CloseIcon}
                  alt={"close"}
                  onClick={() => closeDialog()}
                />
              </Row>
              <IconBorder>
                <img src={ShoppingBagIcon} />
              </IconBorder>
              <Text
                textStyle={theme.textTheme.title.medium}
                margin={{ top: "8px" }}
              >
                Confirmer votre réservation ?
              </Text>
              <PriceRow
                justifyContent="space-between"
                margin={{ top: "8px" }}
                alignItems="center"
                width="50%"
              >
                <Text>Total HT{hasPriceSurplus ? "*" : ""}</Text>
                <Text textStyle={theme.textTheme.title.medium}>
                  {prebook.price.totalHt.toFixed(2)}€
                </Text>
              </PriceRow>
              <Text
                textStyle={theme.textTheme.body.medium}
                margin={{ top: "22px" }}
                textAlign="center"
              >
                Le montant de la réservation sera ajouté à votre prochaine
                facture hebdomadaire.
              </Text>
              {hasPriceSurplus && (
                <Text
                  textStyle={theme.textTheme.body.small.copyWith({
                    color: theme.color.primary[300],
                  })}
                  margin={{ top: "8px" }}
                  textAlign="center"
                >
                  *majoration de 1,50€ au delà du plafond de 50 livraisons/mois
                </Text>
              )}
              <Row margin={{ top: "16px" }}>
                <ButtonSecondary onClick={() => closeDialog()}>
                  <Text textStyle={theme.textTheme.label.medium}>Modifier</Text>
                </ButtonSecondary>
                <ButtonPrimary margin={{ left: "16px" }} onClick={notifier}>
                  <Text textStyle={theme.textTheme.label.medium}>
                    Confirmer
                  </Text>
                </ButtonPrimary>
              </Row>
            </Column>
          </ModalContent>
        )}
      </Modal>
    </ModalProvider>
  );
}

const Close = styled.img`
  cursor: pointer;
  margin-bottom: 16px;
`;

const PriceRow = styled(Row)`
  background: #e7eef7; // TODO use theme
  mix-blend-mode: normal;
  border-radius: 15px;
  padding-left: 16px;
  padding-right: 16px;
`;

const IconBorder = styled.div`
  background: #e7eef7; // TODO use theme
  border-radius: 24px;
  padding: 8px;
`;
