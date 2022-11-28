import React, { useState } from "react";
import styled, { css, useTheme } from "styled-components";
import { Flexible, Row, Spacing } from "@yper-script/react/app/widget/generic";
import { MaterialIcon, Text } from "@yper-script/react/app/widget/mixins";
import {
  ButtonOutlined,
  ButtonPrimary,
  ButtonSecondary,
} from "@yper-script/react/app/widget/button";
import Switch from "react-switch";
import EnrollmentScreen from "@yper-script/react/app/screen/enrollment/enrollment_screen";
import SubscriptionCard from "@yper-script/react/app/widget/subscription/subscription_card";
import { stringFromEnum } from "@yper-script/react/utils";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ProSubscriptionsNotifier } from "@yper-script/react/app/notifiers/subscription/subscription_notifier";
import { CompareSubscriptionDialog } from "../../widget/subscription/compare_subscription_dialog";
import {
  SubscriptionBillingPeriod,
  SubscriptionName,
} from "@yper-script/react/data/entity/subscription.entity";

function EnrollmentOffer() {
  const theme = useTheme();
  const [period, setPeriod] = useState(SubscriptionBillingPeriod.annually);
  const [selected, setSelected] = useState(SubscriptionName.yper_essential);
  const isAnnual = period == SubscriptionBillingPeriod.annually;
  const showModal = useRecoilValue(ProSubscriptionsNotifier.dialogProvider);
  const displayModal = useSetRecoilState(
    ProSubscriptionsNotifier.dialogProvider
  );

  const onOfferSelected = offer => {
    setSelected(offer.name);
    setPeriod(offer.period);
  };

  return (
    <EnrollmentScreen>
      <Row justifyContent={"space-between"} alignItems={"center"}>
        <Flexible justifyContent={"flex-start"}>
          <Text
            textStyle={theme.textTheme.display.small.copyWith({
              color: theme.color.secondary[400],
            })}
          >
            {">"}
          </Text>
          <Text
            margin={{ left: "0.5rem" }}
            textStyle={theme.textTheme.display.small}
          >
            Ma formule :
          </Text>
        </Flexible>
        <SwitchContainer
          width="auto"
          padding={{ right: "20px", left: "20px", top: "8px", bottom: "8px" }}
          alignItems={"center"}
        >
          <Text
            margin={{ right: "8px" }}
            textStyle={theme.textTheme.label.medium.copyWith({
              color: isAnnual ? theme.color.primary[300] : null,
            })}
          >
            Mensuel
          </Text>
          <Switch
            onChange={bool =>
              setPeriod(
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
          <Text
            margin={{ left: "8px" }}
            textStyle={theme.textTheme.label.medium.copyWith({
              color: !isAnnual ? theme.color.primary[300] : null,
            })}
          >
            Annuel
          </Text>
        </SwitchContainer>
      </Row>
      <Spacing margin={{ top: "14px" }}></Spacing>
      <SubscriptionCard
        name={SubscriptionName.yper_start}
        period={period}
        selected={selected === SubscriptionName.yper_start}
        onClick={setSelected}
      />
      <Spacing margin={{ top: "22px" }}></Spacing>
      <SubscriptionCard
        name={SubscriptionName.yper_essential}
        period={period}
        selected={selected === SubscriptionName.yper_essential}
        onClick={setSelected}
      />
      <Spacing margin={{ top: "22px" }}></Spacing>
      <SubscriptionCard
        name={SubscriptionName.yper_premium}
        period={period}
        selected={selected === SubscriptionName.yper_premium}
        onClick={setSelected}
      />
      <Row margin={{ top: "16px" }}>
        <Flexible justifyContent={"flex-start"}>
          <ButtonSecondary
            onClick={() => (window.location.href = "/enrolment/society")}
          >
            <CustomMaterialIcon name="arrow_backward" />
            <Text
              margin={{ left: "10px" }}
              textStyle={theme.textTheme.label.medium}
            >
              Précédent
            </Text>
          </ButtonSecondary>
        </Flexible>
        <Flexible justifyContent={"flex-end"}>
          <ButtonOutlined onClick={() => displayModal(true)}>
            <Text textStyle={theme.textTheme.label.medium}>
              Voir le détail des formules
            </Text>
          </ButtonOutlined>
          <ButtonPrimary
            onClick={() => {
              window.location.href = `/enrolment/payment\?subscription=${stringFromEnum(
                SubscriptionName,
                selected
              )}&billing_period=${stringFromEnum(
                SubscriptionBillingPeriod,
                period
              )}`;
            }}
            margin={{ left: "5px" }}
          >
            <Text
              textStyle={theme.textTheme.label.medium.copyWith({
                color: theme.color.grayscale["000"],
              })}
            >
              Continuer
            </Text>
          </ButtonPrimary>
        </Flexible>
      </Row>
      {showModal && (
        <CompareSubscriptionDialog
          callback={onOfferSelected}
          currentOffer={{
            name: selected,
            period: period,
          }}
        />
      )}
    </EnrollmentScreen>
  );
}

export default EnrollmentOffer;

/** Styled Component */
const CustomMaterialIcon = styled(MaterialIcon)`
  max-width: 20px;
`;

const FormulaContainer = styled(Row)<any>`
  margin-top: 16px;
  position: relative;
  width: 100%;
  padding: 16px 16px 16px 0;
  background-color: ${props => props.theme.color.grayscale["000"]};
  border: 1px solid ${props => props.theme.color.primary["200"]};
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    box-shadow: 0 2px 6px rgba(54, 80, 108, 0.2);
  }
  ${props =>
    props.selected &&
    css`
      border: 2px solid ${props => props.theme.color.success["400"]};
    `}
`;

const Banner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 13px;
  background-color: ${props => props.color};
  border-radius: 8px 0 0 8px;
`;

const Icon = styled.img`
  width: 70px;
  z-index: 1;
`;

const SwitchContainer = styled(Row)`
  background-color: ${props => props.theme.color.primary["100"]};
  border-radius: 4px;
`;
