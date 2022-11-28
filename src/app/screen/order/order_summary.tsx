import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import { SvgPicture, Text } from "@yper-script/react/app/widget/mixins";
import { Column, Flexible, Row } from "@yper-script/react/app/widget/generic";
import { useRecoilState, useRecoilValue } from "recoil";
import { PrebookNotifier } from "@yper-script/react/app/notifiers/order/prebook_notifier";
import { useTranslation } from "react-i18next";
import { capitalizeText } from "../../widget/helper/capitalize_text";
import { ButtonSecondary } from "../../widget/button";
import { ProSubscriptionsNotifier } from "../../notifiers/subscription/subscription_notifier";
import { CompareCurrentSubscriptionDialog } from "../account/subscription/compare_subscription_dialog";
import { SubscriptionName } from "@yper-script/react/data/entity/subscription.entity";
import { CurrentProNotifier } from "../../notifiers/pro/current_pro_notifier";
import { reloadItineraryMapState } from "../../widget/map";

/** Images */
const euroSymbol = "/img/react/order/ic_euro_symbol_fill.svg";
const infoIcon = "/img/react/icon/ic_information_circle_full.svg";
const timeClock = "/img/react/icon/ic_time_clock_circle.svg";
const flashIcon = "/img/react/icon/ic_flash.svg";
const addLoveIcon = "/img/react/icon/ic_love_it_add.svg";
const arrowRightIcon = "/img/react/icon/ic_arrow_right.svg";

function OrderSummary(props: { orderId: string; prebookId: string }) {
  const theme = useTheme();
  const { t } = useTranslation([], {
    keyPrefix: "price",
  });
  const prebookLoadable = useRecoilValue(
    PrebookNotifier.provider(props.prebookId)
  );
  const [show, displayDetail] = useState(false);
  const [showModal, displayModal] = useRecoilState(
    ProSubscriptionsNotifier.dialogProvider
  );
  const pro = useRecoilValue(CurrentProNotifier.provider);
  const subscription = useRecoilValue(ProSubscriptionsNotifier.provider)[0];
  const prebook = prebookLoadable.contents;
  const distance = prebook
    ? Math.ceil(prebook.distance.billed / 1000).toFixed(2)
    : 0;
  const detailsPadding = {
    top: "4px",
    right: "18px",
    bottom: "4px",
    left: "18px",
  };
  const [isItineraryMapReloaded, setIsItineraryMapReloaded] = useRecoilState(
    reloadItineraryMapState
  );

  useEffect(() => {
    setIsItineraryMapReloaded(true);
  }, []);

  return (
    <>
      <SummaryFixedColumn>
        <Summary width="100%">
          <Row
            width="100%"
            padding={{
              left: "16px",
              right: "16px",
              bottom: "16px",
              top: "16px",
            }}
            alignItems={"start"}
            justifyContent={"start"}
          >
            <Flexible size={2} alignItems={"start"}>
              <SvgPicture src={euroSymbol} height="24px" width="24px" />
              <Text
                margin={{}}
                textStyle={theme.textTheme.title.medium.copyWith({
                  color: theme.color.grayscale["000"],
                })}
              >
                {prebook?.order.id}
              </Text>
            </Flexible>
            <Row alignItems="end" justifyContent="end">
              <Text
                textStyle={theme.textTheme.title.small.copyWith({
                  color: theme.color.grayscale["000"],
                })}
              >
                HT
              </Text>
              <Text
                textStyle={theme.textTheme.title.large.copyWith({
                  color: theme.color.grayscale["000"],
                })}
                margin={{ left: "4px" }}
              >
                {prebook.price.totalHt.toFixed(2)} €
              </Text>
            </Row>
          </Row>
          <OrderDetails width="100%" show={show}>
            <Row padding={detailsPadding} justifyContent={"space-between"}>
              <Text
                textStyle={theme.textTheme.body.medium.copyWith({
                  color: theme.color.primary["300"],
                })}
              >
                Trajet ({distance}km):
              </Text>
              <Text
                textStyle={theme.textTheme.body.medium.copyWith({
                  color: theme.color.primary["300"],
                })}
              >
                {prebook.price.base
                  ? prebook.price.base.toFixed(2)
                  : (0).toFixed(2)}{" "}
                €
              </Text>
            </Row>
            {...prebook.price.detail.surcharges
              .filter(s => s.canApply)
              .map(s => (
                <Row padding={detailsPadding} justifyContent={"space-between"}>
                  <Text
                    textStyle={theme.textTheme.body.medium.copyWith({
                      color: theme.color.primary["300"],
                    })}
                  >
                    {capitalizeText(t(s.name))} :
                  </Text>
                  <Text
                    textStyle={theme.textTheme.body.medium.copyWith({
                      color: theme.color.primary["300"],
                    })}
                  >
                    {s.amount.toFixed(2)} €
                  </Text>
                </Row>
              ))}
            <Row padding={detailsPadding} justifyContent={"space-between"}>
              <Text
                textStyle={theme.textTheme.body.medium.copyWith({
                  color: theme.color.primary["300"],
                })}
              >
                TVA (20%) :
              </Text>
              <Text
                textStyle={theme.textTheme.body.medium.copyWith({
                  color: theme.color.primary["300"],
                })}
              >
                {prebook.price?.tva.toFixed(2)} €
              </Text>
            </Row>
            <Row padding={detailsPadding} justifyContent={"space-between"}>
              <Text
                textStyle={theme.textTheme.body.medium.copyWith({
                  color: theme.color.primary["400"],
                })}
              >
                Total TTC
              </Text>
              <Text
                textStyle={theme.textTheme.body.medium.copyWith({
                  color: theme.color.primary["400"],
                })}
              >
                {prebook?.price?.totalTtc.toFixed(2)} €
              </Text>
            </Row>
          </OrderDetails>
          <Details
            padding={{
              left: "16px",
              right: "16px",
              top: "16px",
              bottom: "16px",
            }}
            justifyContent={"center"}
            alignItems={"end"}
          >
            <Text
              textStyle={theme.textTheme.label.medium.copyWith({
                color: theme.color.grayscale["000"],
              })}
              onClick={() => displayDetail(!show)}
            >
              {show ? "Masquer" : "Afficher"} le détail du prix
            </Text>
          </Details>
        </Summary>
        {pro.commercialOfferId == null &&
          subscription.name != SubscriptionName.yper_premium && (
            <UpgradeSubscriptionColumn
              alignItems="center"
              margin={{ top: "24px" }}
              padding={{
                top: "24px",
                bottom: "24px",
                left: "24px",
                right: "24px",
              }}
            >
              <Text textStyle={theme.textTheme.title.medium} textAlign="center">
                {subscription.name == SubscriptionName.yper_start
                  ? "Plus d'avantages avec Essential et Premium !"
                  : "Plus d'avantages avec la formule Premium !"}
              </Text>
              <Row margin={{ top: "24px" }} alignItems="center">
                <AdvantageSvg src={timeClock} height="44px" width="47px" />
                <Column margin={{ left: "12px" }}>
                  <Text textStyle={theme.textTheme.label.medium}>
                    Précision du créneau
                  </Text>
                  <Text>
                    {subscription.name == SubscriptionName.yper_start
                      ? "Renseignez un créneau d'une durée plus courte"
                      : "Renseignez un créneau d'une durée d'1h !"}
                  </Text>
                </Column>
              </Row>
              <Row margin={{ top: "24px", bottom: "24px" }} alignItems="center">
                <AdvantageSvg src={flashIcon} height="44px" width="47px" />
                <Column margin={{ left: "12px" }}>
                  <Text textStyle={theme.textTheme.label.medium}>
                    Livraison express
                  </Text>
                  <Text>
                    {subscription.name == SubscriptionName.yper_start
                      ? "Réservez une livraison pour dans 2 heures."
                      : "Réservez une livraison pour dans 1 heure"}
                  </Text>
                </Column>
              </Row>
              <Row alignItems="center">
                <AdvantageSvg src={addLoveIcon} height="44px" width="47px" />
                <Column margin={{ left: "12px" }}>
                  <Text textStyle={theme.textTheme.label.medium}>
                    Autres avantages
                  </Text>
                  <Text>
                    {subscription.name == SubscriptionName.yper_start
                      ? "Assistance, statistiques, plus de livraisons ..."
                      : "Assurance de la marchandise augmentée, livraisons illimitées ..."}
                  </Text>
                </Column>
              </Row>
              <ButtonSecondary
                margin={{ top: "32px" }}
                onClick={() => displayModal(true)}
              >
                <Text
                  margin={{ right: "10px" }}
                  textStyle={theme.textTheme.label.medium}
                >
                  Voir les offres
                </Text>
                <SvgPicture src={arrowRightIcon} height="18px" width="12px" />
              </ButtonSecondary>
            </UpgradeSubscriptionColumn>
          )}
        {pro.commercialOfferId == null &&
          subscription.name == SubscriptionName.yper_essential && (
            <EssentialInfoRow
              alignItems="center"
              margin={{ top: "13px" }}
              padding={{
                left: "12px",
                right: "12px",
                bottom: "8px",
                top: "8px",
              }}
            >
              <SvgPicture
                src={infoIcon}
                width="40px"
                color={theme.color.information[400]}
              />
              <Text
                textStyle={theme.textTheme.body.small}
                margin={{ left: "10px" }}
              >
                Au delà de 50 livraisons réservées/mois, une majoration de 1,50€
                par livraison vous est facturée.
              </Text>
            </EssentialInfoRow>
          )}
      </SummaryFixedColumn>
      {showModal && <CompareCurrentSubscriptionDialog />}
    </>
  );
}

export default OrderSummary;

/** Styled Component */
const OrderDetails = styled(Column)<{ show: boolean }>`
  background-color: ${props => props.theme.color.grayscale["000"]};
  display: ${props => (props.show ? "block" : "none")};
`;

const SummaryFixedColumn = styled(Column)`
  width: fit-content;
  min-width: 310px;
  height: fit-content;
  position: sticky;
  top: 100px;
`;

const Summary = styled(Column)`
  background-color: ${props => props.theme.color.primary["400"]};
  margin-top: 19px;
  border-radius: 10px;

  &::before {
    content: "";
    position: absolute;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 12px solid ${props => props.theme.color.primary["400"]};
    transform: rotate(-90deg);
    left: -17px;
    top: 50px;
  }
`;

const Details = styled(Flexible)`
  cursor: pointer;
`;

const EssentialInfoRow = styled(Row)`
  background-color: ${props => props.theme.color.information[100]};
  border: 1px solid ${props => props.theme.color.information[400]};
  border-radius: 10px;
`;

const UpgradeSubscriptionColumn = styled(Column)`
  background-color: ${props => props.theme.color.grayscale["000"]};
  box-shadow: 0px 2px 20px rgba(54, 80, 108, 0.1);
  border-radius: 8px;
`;

const AdvantageSvg = styled(SvgPicture)`
  padding: 8px;
  background-color: ${props => props.theme.color.secondary["200"]};
  box-shadow: 0px 2px 20px rgba(54, 80, 108, 0.1);
  border-radius: 8px;
`;
