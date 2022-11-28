import React, { useState } from "react";
import { useTheme } from "styled-components";
import styled from "styled-components";
import Modal, { ModalProvider } from "styled-react-modal";
import Switch from "react-switch";
import {
  Column,
  Expanded,
  Row,
  Spacing,
} from "@yper-script/react/app/widget/generic";
import { MaterialIcon, Text } from "@yper-script/react/app/widget/mixins";
import { ButtonPrimary } from "@yper-script/react/app/widget/button";
import { useSetRecoilState } from "recoil";
import { ProSubscriptionsNotifier } from "@yper-script/react/app/notifiers/subscription/subscription_notifier";
import { useTranslation } from "react-i18next";
import { stringFromEnum } from "@yper-script/react/utils";
import {
  SubscriptionName,
  SubscriptionBillingPeriod,
} from "@yper-script/react/data/entity/subscription.entity";

export interface SubscriptionInterface {
  name: SubscriptionName;
  period: SubscriptionBillingPeriod;
}

export function CompareSubscriptionDialog(props: {
  callback: any;
  currentOffer: SubscriptionInterface;
}) {
  const theme = useTheme();
  const [period, changePeriod] = useState(props.currentOffer.period);
  const showModal = useSetRecoilState(ProSubscriptionsNotifier.dialogProvider);
  const isAnnual = period == SubscriptionBillingPeriod.annually;

  return (
    <ModalProvider backgroundComponent={ModalBackground}>
      <ModalContainer
        isOpen={true}
        onBackgroundClick={() => showModal(false)}
        onEscapeKeydown={() => showModal(false)}
        opacity={1}
      >
        <ModalContent width="100%" alignItems={"center"}>
          <Row justifyContent={"flex-end"}>
            <CloseIcon name={"close"} onClick={() => showModal(false)} />
          </Row>
          <Row alignItems="center">
            <Text
              textStyle={theme.textTheme.display.small.copyWith({
                color: theme.color.secondary[400],
              })}
            >
              {">"}
            </Text>
            <Text
              margin={{ left: "0.5rem" }}
              textAlign="center"
              textStyle={theme.textTheme.headline.medium}
            >
              Comparez les offres
            </Text>
          </Row>
          <CheckboxRow
            padding={{ top: "8px", bottom: "8px", left: "8px", right: "8px" }}
            margin={{ top: "16px", bottom: "16px" }}
            alignItems="center"
          >
            <Expanded justifyContent="end">
              <Text
                margin={{ right: "8px" }}
                textStyle={theme.textTheme.label.medium.copyWith({
                  color: isAnnual ? theme.color.primary[300] : null,
                })}
              >
                Paiement mensuel
              </Text>
            </Expanded>
            <Switch
              onChange={bool =>
                changePeriod(
                  bool
                    ? SubscriptionBillingPeriod.annually
                    : SubscriptionBillingPeriod.monthly
                )
              }
              checked={isAnnual}
              checkedIcon={false}
              uncheckedIcon={false}
              onColor={theme.color.primary[400]}
              offColor={theme.color.primary[400]}
              handleDiameter={20}
              width={48}
            />
            <Expanded justifyContent="start">
              <Text
                margin={{ left: "8px", right: "8px" }}
                textStyle={theme.textTheme.label.medium.copyWith({
                  color: !isAnnual ? theme.color.primary[300] : null,
                })}
              >
                Paiement annuel
              </Text>
              <AnnualOfferText
                padding={{
                  top: "6px",
                  bottom: "6px",
                  right: "6px",
                  left: "6px",
                }}
                textStyle={theme.textTheme.label.small}
              >
                2 mois offerts !
              </AnnualOfferText>
            </Expanded>
          </CheckboxRow>
          <Row>
            <SubscriptionDetail
              offer={{ name: SubscriptionName.yper_start, period: period }}
              callback={props.callback}
              currentOffer={props.currentOffer}
            />
            <Spacing margin={{ left: "8px", right: "8px" }} />
            <SubscriptionDetail
              offer={{ name: SubscriptionName.yper_essential, period: period }}
              callback={props.callback}
              currentOffer={props.currentOffer}
            />
            <Spacing margin={{ left: "8px", right: "8px" }} />
            <SubscriptionDetail
              offer={{ name: SubscriptionName.yper_premium, period: period }}
              callback={props.callback}
              currentOffer={props.currentOffer}
            />
          </Row>
        </ModalContent>
      </ModalContainer>
    </ModalProvider>
  );
}

export function SubscriptionDetail(props: {
  offer: SubscriptionInterface;
  callback: any;
  currentOffer: SubscriptionInterface;
}) {
  const theme = useTheme();
  const { t } = useTranslation([], {
    keyPrefix: `commercial_offers.${stringFromEnum(
      SubscriptionName,
      props.offer.name
    )}`,
  });
  const list = t(`advantages`, { returnObjects: true });
  const advantages = typeof list == "string" ? [] : list;
  const showModal = useSetRecoilState(ProSubscriptionsNotifier.dialogProvider);

  const onOfferSelected = offer => {
    showModal(false);
    props.callback(offer);
  };

  const price =
    props.offer.period == SubscriptionBillingPeriod.annually
      ? (parseInt(t("price")) * 10) / 12
      : parseInt(t("price"));

  return (
    <SubscriptionColumn alignItems={"center"} justifyContent="start">
      <ColorBanner
        color={
          props.offer.name == SubscriptionName.yper_start
            ? theme.color.secondary[200]
            : props.offer.name == SubscriptionName.yper_essential
            ? theme.color.primary[100]
            : theme.color.secondary[500]
        }
      />
      <Row alignItems="center" margin={{ top: "16px" }}>
        <Text
          textStyle={theme.textTheme.title.large.copyWith({
            color: theme.color.secondary[400],
          })}
        >
          {">"}
        </Text>
        <Text
          margin={{ left: "0.5rem" }}
          textAlign="center"
          textStyle={theme.textTheme.title.large}
        >
          {t("short_name")}
        </Text>
      </Row>
      <Row margin={{ top: "8px" }} alignItems="end">
        <Text textStyle={theme.textTheme.display.small}> {price}€ </Text>
        <Text
          margin={{ left: "4px" }}
          textStyle={theme.textTheme.body.large.copyWith({
            color: theme.color.primary[300],
          })}
        >
          H.T/mois
        </Text>
      </Row>
      <Text
        textStyle={theme.textTheme.body.small.copyWith({
          color: theme.color.primary[300],
        })}
      >
        par point de vente
      </Text>
      <PromoText
        visible={
          props.offer.name != SubscriptionName.yper_start &&
          props.offer.period == SubscriptionBillingPeriod.annually
        }
        textStyle={theme.textTheme.body.xsmall}
        textAlign="center"
        margin={{ top: "4px", bottom: "8px", left: "16px", right: "16px" }}
      >
        {`au lieu de ${price +
          price * 0.2}€/mois, engagement d'un an payable en une fois`}
      </PromoText>
      {props.currentOffer.name == props.offer.name &&
      (props.currentOffer.period == props.offer.period ||
        props.offer.name == SubscriptionName.yper_start) ? (
        <Row alignItems="center" padding={{ top: "8px", bottom: "8px" }}>
          <MaterialIcon
            color={theme.color.success["400"]}
            name="check_circle"
          />
          <Text
            margin={{ left: "8px" }}
            textStyle={theme.textTheme.label.small}
          >
            Offre actuelle
          </Text>
        </Row>
      ) : (
        <ButtonPrimary onClick={() => onOfferSelected(props.offer)}>
          <Text
            textStyle={theme.textTheme.body.small.copyWith({
              color: theme.color.grayscale["000"],
            })}
          >
            Choisir cette offre
          </Text>
        </ButtonPrimary>
      )}
      <Column margin={{ top: "16px", bottom: "16px" }} alignItems="start">
        {advantages?.map(advantage => (
          <div key={advantage.title}>
            <Row
              justifyContent="start"
              alignItems="center"
              margin={{ top: "12px" }}
              padding={{ left: "16px", right: "16px" }}
            >
              <MaterialIcon color={theme.color.success["400"]} name="check" />
              <Text
                margin={{ left: "4px" }}
                textStyle={theme.textTheme.body.small}
              >
                {advantage.title}
              </Text>
            </Row>
            {advantage.more != null && (
              <Text
                margin={{ left: "40px" }}
                textStyle={theme.textTheme.body.xsmall.copyWith({
                  style: "italic",
                })}
              >
                {advantage.more}
              </Text>
            )}
          </div>
        ))}
      </Column>
    </SubscriptionColumn>
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

const ModalContent = styled(Column)`
  background-color: ${props => props.theme.color.grayscale["000"]};
  max-width: 60vw;
  border-radius: 8px;
  padding: 16px 24px 16px 24px;
`;

const CloseIcon = styled(MaterialIcon)`
  cursor: pointer;
  margin-bottom: 4px;
`;

const CheckboxRow = styled(Row)`
  background: #e7eef7;
  border-radius: 8px;
`;

const SubscriptionColumn = styled(Column)`
  background: #ffffff;
  /* Primary/200 */

  border: 1px solid #c0d0e2;
  border-radius: 8px;
`;

const AnnualOfferText = styled(Text)`
  background: #ffcf00;
  border-radius: 8px;
`;

const ColorBanner = styled.div<{ color: string }>`
  background: ${props => props.color};
  border-radius: 8px 8px 0px 0px;
  height: 12px;
  width: 100%;
`;

const ModalBackground = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 16px;
  z-index: 30;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  overflow-y: auto;
`;

const PromoText = styled(Text)<{ visible: boolean }>`
  visibility: ${props => (props.visible ? "visible" : "hidden")};
`;
