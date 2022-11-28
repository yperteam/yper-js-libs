import React from "react";
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { ProSubscriptionsNotifier } from "@yper-script/react/app/notifiers/subscription/subscription_notifier";
import { CompareCurrentSubscriptionDialog } from "@yper-script/react/app/screen/account/subscription/compare_subscription_dialog";
import {
  Column,
  Row,
  Expanded,
  Flexible,
  Spacing,
} from "@yper-script/react/app/widget/generic";
import {
  Text,
  BoldText,
  MaterialIcon,
} from "@yper-script/react/app/widget/mixins";
import CustomLoader from "@yper-script/react/app/widget/loader";
import useWindowDimensions from "@yper-script/react/app/widget/window_dimension_hook";
import styled, { useTheme } from "styled-components";
import {
  ProSubscription,
  SubscriptionName,
} from "@yper-script/react/data/entity/subscription.entity";
import moment from "moment";
import { Tooltip } from "@yper-script/react/app/widget/tooltip";
import { ProLimitNotifier } from "@yper-script/react/app/notifiers/pro/pro_limit_notifier";
import { CurrentProNotifier } from "../../notifiers/pro/current_pro_notifier";

function Homepage(props: { todayDeliveries: number }) {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const isMd = width >= 768;
  const show = useRecoilValue(ProSubscriptionsNotifier.dialogProvider);
  const loadable = useRecoilValueLoadable(ProSubscriptionsNotifier.provider);
  const limitLoadable = useRecoilValueLoadable(ProLimitNotifier.provider);
  const proLoadable = useRecoilValueLoadable(CurrentProNotifier.provider);

  return (
    <>
      <Row>
        {isMd && <Expanded size={1} />}
        <Flexible size={isMd ? 12 : 1}>
          <CardContainer width="100%">
            <Text
              margin={{ bottom: "12px" }}
              textStyle={theme.textTheme.title.medium}
            >
              Mon volume de livraisons
            </Text>
            <Expanded justifyContent="start">
              {loadable.state == "loading" ||
              limitLoadable.state == "loading" ||
              proLoadable.state == "loading" ? (
                <CustomLoader height="14px" />
              ) : (
                <DeliveryVolume todayDeliveries={props.todayDeliveries} />
              )}
            </Expanded>
          </CardContainer>
        </Flexible>
      </Row>
      <>{show && <CompareCurrentSubscriptionDialog />}</>
    </>
  );
}

function DeliveryVolume(props: { todayDeliveries: number }) {
  const theme = useTheme();
  const subscription = useRecoilValue(ProSubscriptionsNotifier.provider)[0];
  const limit = useRecoilValue(ProLimitNotifier.provider);
  const displayModal = useSetRecoilState(
    ProSubscriptionsNotifier.dialogProvider
  );
  const pro = useRecoilValue(CurrentProNotifier.provider);
  const deliveryLimit =
    limit.monthlyDeliveryLimit == -1
      ? limit.monthlyDeliveryOverchargeThreshold
      : limit.monthlyDeliveryLimit;
  const colorLimit =
    deliveryLimit != -1 && limit.totalMonthlyDeliveries >= deliveryLimit
      ? subscription?.name == SubscriptionName.yper_start
        ? theme.color.error["400"]
        : theme.color.warning["400"]
      : null;
  const now = moment();
  const date = moment(subscription?.startDate ?? moment().startOf("month"));
  const resetDate = date.add(
    Math.floor(Math.abs(now.diff(date, "months", true))) + 1,
    "months"
  );

  return (
    <Row width="auto" alignItems="start" justifyContent="start">
      <Column>
        <Text
          textStyle={theme.textTheme.body.medium.copyWith({
            color: theme.color.grayscale[400],
          })}
        >
          Aujourd'hui
        </Text>
        <Text
          textStyle={theme.textTheme.title.large.copyWith({
            color: theme.color.primary[400],
          })}
        >
          {props.todayDeliveries}
        </Text>
      </Column>
      <Divider />
      <Column>
        <Text
          textStyle={theme.textTheme.body.medium.copyWith({
            color: theme.color.grayscale[400],
          })}
        >
          Ce mois-ci
        </Text>
        <Row justifyContent="start" alignItems="center">
          <Text
            textStyle={theme.textTheme.title.large.copyWith({
              color: theme.color.primary[400],
            })}
          >
            <TextColor color={colorLimit}>
              {limit.totalMonthlyDeliveries}
            </TextColor>
            {deliveryLimit != -1 ? `/${deliveryLimit}` : ""}
          </Text>
          {deliveryLimit != -1 && (
            <InfoIcon
              data-tip
              data-for="more_info"
              color={colorLimit ?? theme.color.information["400"]}
              name="info"
            />
          )}
          <Tooltip id="more_info" place="bottom" offset={{ top: 0 }}>
            <Text
              textStyle={theme.textTheme.body.small.copyWith({
                color: theme.color.grayscale["000"],
              })}
            >
              {subscription.name == SubscriptionName.yper_start
                ? `Votre formule Start vous permet de réserver ${deliveryLimit} livraisons par mois maximum.`
                : `Au delà de ${deliveryLimit} livraisons réservées/mois, une majoration de 1,50€ par livraison vous est facturée`}
            </Text>
          </Tooltip>
        </Row>
        {subscription.name != SubscriptionName.yper_premium && (
          <Text textStyle={theme.textTheme.body.xsmall}>
            Remise à zero: {resetDate.format("DD MMM")}
          </Text>
        )}
      </Column>
      {pro.commercialOfferId == null &&
        subscription.name != SubscriptionName.yper_premium && (
          <SubscriptionContainer
            margin={{ left: "14px" }}
            alignItems="end"
            subscription={subscription}
          >
            {subscription.name == SubscriptionName.yper_start ? (
              <Text
                textStyle={theme.textTheme.body.small}
                margin={{ bottom: "8px" }}
              >
                Réservez <BoldText>50 livraisons/mois</BoldText>, passez à la
                formule Essential !
              </Text>
            ) : (
              <Text
                textStyle={theme.textTheme.body.small}
                margin={{ bottom: "8px" }}
              >
                Pour des livraisons illimitées, passez à la formule Premium !
              </Text>
            )}
            <ClickableText
              textStyle={theme.textTheme.body.small.copyWith({
                color: theme.color.information[400],
              })}
              onClick={() => displayModal(true)}
            >
              Voir les formules
            </ClickableText>
          </SubscriptionContainer>
        )}
    </Row>
  );
}

const CardContainer = styled(Column)`
  background: #ffffff;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.0350197);
  border-radius: 8px;
  padding: 16px;
`;

const SubscriptionContainer = styled(Column)<{ subscription: ProSubscription }>`
  background: ${props =>
    props.subscription.name == SubscriptionName.yper_start
      ? props.theme.color.warning[100]
      : props.theme.color.information[100]};
  border: ${props =>
    props.subscription.name == SubscriptionName.yper_start
      ? `1px solid ${props.theme.color.warning[400]}`
      : null};
  border-radius: 4px;
  height: 100%;
  max-width: 45%;
  padding: 8px;
`;

const Divider = styled.div`
  width: 1px;
  height: 100%;
  background: #dfe5ed;
  margin: 0px 16px;
`;

const ClickableText = styled(Text)`
  text-decoration: underline;
  cursor: pointer;
`;

const TextColor = styled.span<{ color: string }>`
  color: ${props => props.color};
`;

const InfoIcon = styled(MaterialIcon)`
  cursor: help;
`;

export default Homepage;
