import React, { useEffect } from "react";
import {
  useRecoilValueLoadable,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import parse from "html-react-parser";
import { ProSubscriptionsNotifier } from "@yper-script/react/app/notifiers/subscription/subscription_notifier";
import {
  CardBody,
  CardHeader,
  CardTitle,
  MainCard,
} from "@yper-script/react/app/widget/card";
import styled, { css, useTheme } from "styled-components";
import { Col, Column, Row } from "@yper-script/react/app/widget/generic";
import { ButtonPrimary } from "@yper-script/react/app/widget/button";
import {
  MaterialIcon,
  Text,
  BoldText,
} from "@yper-script/react/app/widget/mixins";
import CustomLoader from "@yper-script/react/app/widget/loader";
import { useTranslation } from "react-i18next";
import { CompareCurrentSubscriptionDialog } from "@yper-script/react/app/screen/account/subscription/compare_subscription_dialog";
import {
  ProSubscription,
  SubscriptionBillingPeriod,
  SubscriptionName,
} from "@yper-script/react/data/entity/subscription.entity";
import moment from "moment";
import { CurrentProNotifier } from "@yper-script/react/app/notifiers/pro/current_pro_notifier";

function Subscription() {
  document.title = "Yper.shop | Mon abonnement";
  const loadable = useRecoilValueLoadable(ProSubscriptionsNotifier.provider);
  const proLoadable = useRecoilValueLoadable(CurrentProNotifier.provider);
  const showModal = useRecoilValue(ProSubscriptionsNotifier.dialogProvider);

  if (loadable.state == "loading" || proLoadable.state == "loading") {
    return <CustomLoader />;
  } else if (loadable.state == "hasError" || proLoadable.state == "hasError") {
    return <div></div>; // TODO
  }

  return (
    <>
      <SubscriptionContent />
      {showModal && <CompareCurrentSubscriptionDialog />}
    </>
  );
}

function SubscriptionContent() {
  const theme = useTheme();
  const subscriptions = useRecoilValue(ProSubscriptionsNotifier.provider);
  const showModal = useSetRecoilState(ProSubscriptionsNotifier.dialogProvider);

  let name = subscriptions[0].name;
  const { t } = useTranslation([], { keyPrefix: `commercial_offers.${name}` });

  let isCanceled = !subscriptions[0].autoRenew;

  const list = t(`advantages`, { returnObjects: true });
  const advantages = typeof list == "string" ? [] : list;
  const isAnnual =
    subscriptions[0].billingPeriod == SubscriptionBillingPeriod.annually;
  const pro = useRecoilValue(CurrentProNotifier.provider);
  const price = isAnnual
    ? (parseInt(t("price")) * 10) / 12
    : parseInt(t("price"));

  return (
    <>
      <MainCard>
        <CardHeader>
          <Row justifyContent={"space-between"}>
            <CardTitle alignItems="center">
              <MaterialIcon color={theme.color.primary[400]} name="style" />
              <span>Ma formule</span>
            </CardTitle>
            {pro.commercialOfferId == null && (
              <ChangeFormulaButton
                onPointerDown={() => (isCanceled ? {} : showModal(true))}
                canceled={isCanceled}
              >
                <MaterialIcon
                  color={theme.color.grayscale["000"]}
                  name="swap_horiz"
                />
                <Text
                  margin={{ bottom: "0px", left: "4px" }}
                  textStyle={theme.textTheme.label.large.copyWith({
                    color: theme.color.grayscale["000"],
                  })}
                >
                  Changer ma formule
                </Text>
              </ChangeFormulaButton>
            )}
          </Row>
        </CardHeader>
        <CardBody>
          {isCanceled && (
            <DeactivatedBanner
              current={subscriptions[0]}
              next={subscriptions[1]}
            />
          )}
          <Row>
            <Col size={1}>
              <Column
                justifyContent="start"
                alignItems="center"
                margin={{ top: "34px", left: "1rem", right: "1rem" }}
              >
                <Icon
                  src={`/img/react/enrollment/${name}_logo.svg`}
                  alt={"offer Icon"}
                />
                <Row justifyContent="center" margin={{ top: "4px" }}>
                  {pro.commercialOfferId == null && (
                    <Text
                      textStyle={theme.textTheme.display.small.copyWith({
                        color: theme.color.secondary[400],
                      })}
                    >
                      {" "}
                      {">"}{" "}
                    </Text>
                  )}
                  <Text
                    margin={{ left: "0.5rem" }}
                    textStyle={theme.textTheme.headline.large}
                    textAlign="center"
                  >
                    {pro.commercialOfferId == null
                      ? t("short_name")
                      : "Offre sur mesure"}
                  </Text>
                </Row>
                {pro.commercialOfferId == null && (
                  <Row
                    justifyContent="center"
                    margin={{ top: "8px" }}
                    alignItems="end"
                  >
                    <Text textStyle={theme.textTheme.display.medium}>
                      {price}€
                    </Text>
                    <Text
                      margin={{ left: "4px" }}
                      textStyle={theme.textTheme.body.large.copyWith({
                        color: theme.color.primary[300],
                      })}
                    >
                      H.T/mois
                    </Text>
                  </Row>
                )}
                {pro.commercialOfferId == null && (
                  <Text
                    textStyle={theme.textTheme.body.medium.copyWith({
                      color: theme.color.primary[300],
                    })}
                  >
                    par point de vente
                  </Text>
                )}
                {isAnnual && name != SubscriptionName.yper_start && (
                  <AnnualyPaymentContainer
                    margin={{ top: "8px" }}
                    padding={{
                      top: "8px",
                      bottom: "8px",
                      right: "10px",
                      left: "10px",
                    }}
                    width="fit-content"
                    alignItems="center"
                  >
                    <MaterialIcon
                      color={theme.color.success["400"]}
                      name="check"
                    />
                    <Text
                      margin={{ left: "8px", bottom: "0" }}
                      textStyle={theme.textTheme.label.small}
                    >
                      Paiement annuel
                    </Text>
                  </AnnualyPaymentContainer>
                )}
              </Column>
            </Col>
            <AdvantagesCol size={2}>
              <Advantages justifyContent="start" width="100%">
                <Text
                  margin={{ bottom: "0px" }}
                  textStyle={theme.textTheme.title.medium.copyWith({
                    color: theme.color.primary["400"],
                  })}
                >
                  Mes avantages
                </Text>
                {pro.commercialOfferId != null ? (
                  <Text
                    margin={{ top: "16px" }}
                    textStyle={theme.textTheme.body.medium}
                  >
                    Consulter votre contrat afin de connaitre tous vos avantages
                  </Text>
                ) : (
                  advantages?.map(advantage => (
                    <div key={advantage.title}>
                      <Row
                        justifyContent="start"
                        margin={{ top: "24px" }}
                        padding={{ right: "16px" }}
                      >
                        <MaterialIcon
                          color={theme.color.success["400"]}
                          name="check"
                        />
                        <Text
                          margin={{ left: "4px" }}
                          textStyle={theme.textTheme.body.medium}
                        >
                          {advantage.title}
                        </Text>
                      </Row>
                      <Text
                        textStyle={theme.textTheme.body.small.copyWith({
                          color: theme.color.primary[300],
                        })}
                        margin={{ bottom: "2px" }}
                        padding={{ left: "24px" }}
                      >
                        {advantage.content}
                      </Text>
                    </div>
                  ))
                )}
                {pro.commercialOfferId == null &&
                  name != SubscriptionName.yper_premium && (
                    <MoreAdvantages name={name} isCanceled={isCanceled} />
                  )}
              </Advantages>
            </AdvantagesCol>
          </Row>
        </CardBody>
      </MainCard>
    </>
  );
}

export default Subscription;

function MoreAdvantages(props: {
  name: SubscriptionName;
  isCanceled: boolean;
}) {
  const theme = useTheme();
  const showModal = useSetRecoilState(ProSubscriptionsNotifier.dialogProvider);
  const alertIcon = "/img/react/ic_blue_alert.svg";

  return (
    <MoreAdvantagesContainer
      margin={{ top: "24px" }}
      padding={{ top: "12px", right: "12px", bottom: "12px", left: "12px" }}
      alignItems={"end"}
    >
      <Row justifyContent="start" alignItems="center">
        <AlertIcon src={alertIcon} alt={"alert icon"} />
        <Column margin={{ left: "12px" }}>
          <Text textStyle={theme.textTheme.body.medium}>
            <strong>Votre volume de livraisons évolue ?</strong>
          </Text>
          <Text textStyle={theme.textTheme.body.medium}>
            {parse(
              props.name == SubscriptionName.yper_start
                ? "Passez à l'offre Essential pour réserver <strong>jusqu'à 50 livraisons/mois</strong>, et bénéficiez de bien d'autres avantages !"
                : "Passez à l'offre Premium pour faire sauter le plafond et <strong>réserver des livraisons en illimité !</strong>"
            )}
          </Text>
        </Column>
      </Row>
      <CompareOfferButton
        onClick={() => (props.isCanceled ? {} : showModal(true))}
        margin={{ top: "12px" }}
        canceled={props.isCanceled}
      >
        <Row width="fit-content" alignItems="center">
          <Text
            margin={{ right: "8px" }}
            textStyle={theme.textTheme.label.small}
          >
            Comparer les offres
          </Text>
          <MaterialIcon name="arrow_forward" />
        </Row>
      </CompareOfferButton>
    </MoreAdvantagesContainer>
  );
}

function DeactivatedBanner(props: {
  current: ProSubscription;
  next: ProSubscription;
}) {
  const theme = useTheme();
  const { t } = useTranslation([], { keyPrefix: `commercial_offers` });

  return (
    <DeactivateContainer
      padding={{
        top: "17px",
        right: "20px",
        bottom: "17px",
        left: "20px",
      }}
      textStyle={theme.textTheme.body.medium}
    >
      Votre demande de changement d'offre est prise en compte. Votre offre{" "}
      <BoldText>
        {t(`${props.current.name}.short_name`)}{" "}
        {props.current.billingPeriod == SubscriptionBillingPeriod.annually
          ? "annuelle"
          : "mensuelle"}
      </BoldText>{" "}
      prendra fin le {moment(props.current.endDate).format("DD/MM/YYYY")}, et
      votre nouvelle offre{" "}
      <BoldText>
        {t(`${props.next.name}.short_name`)}
        {props.next.name == SubscriptionName.yper_start
          ? ""
          : props.next.billingPeriod == SubscriptionBillingPeriod.annually
          ? " annuelle"
          : " mensuelle"}
      </BoldText>{" "}
      démarrera automatiquement à la suite.
    </DeactivateContainer>
  );
}

const CompareOfferButton = styled(ButtonPrimary)<any>`
  background-color: ${props =>
    props.theme.color.secondary["400"] + " !important"};
  border: 0 solid !important;
  ${props =>
    props.canceled &&
    css`
      i,
      p {
        color: ${props => props.theme.color.primary["200"]} !important;
      }

      cursor: not-allowed !important;
      background-color: ${props =>
        props.theme.color.grayscale["100"]} !important;
      border-color: ${props => props.theme.color.primary["200"]};

      &:hover {
        background-color: ${props =>
          props.theme.color.grayscale["100"]} !important;
        border-color: ${props => props.theme.color.primary["200"]};
      }

      &:focus {
        box-shadow: none;
      }
    `}
`;

const AlertIcon = styled.img`
  height: 20px;
  width: 20px;
`;

const DeactivateContainer = styled(Text)`
  background-color: ${props => props.theme.color.information["100"]};
  border-left: 5px solid ${props => props.theme.color.information["400"]};
`;

const ChangeFormulaButton = styled(ButtonPrimary)<any>`
  border-radius: 5px;
  ${props =>
    props.canceled &&
    css`
      i,
      p {
        color: ${props => props.theme.color.primary["200"]} !important;
      }

      cursor: not-allowed !important;
      background-color: ${props => props.theme.color.grayscale["100"]};
      border-color: ${props => props.theme.color.primary["200"]};

      &:hover {
        background-color: ${props => props.theme.color.grayscale["100"]};
        border-color: ${props => props.theme.color.primary["200"]};
      }

      &:focus {
        box-shadow: none;
      }
    `}
`;

const AdvantagesCol = styled(Col)`
  min-height: 60vh;
  background-color: ${props => props.theme.color.grayscale["100"]};
`;

const Advantages = styled(Column)`
  padding: 32px;
  background-color: ${props => props.theme.color.grayscale["100"]};
`;

const AnnualyPaymentContainer = styled(Row)`
  background-color: ${props => props.theme.color.secondary["100"]};
  border-radius: 100px;
`;

const MoreAdvantagesContainer = styled(Column)`
  background: #ffffff;
  border: 1px solid #4cc0e6;
  box-sizing: border - box;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
`;

const Icon = styled.img`
  width: 70px;
  z-index: 1;
`;
