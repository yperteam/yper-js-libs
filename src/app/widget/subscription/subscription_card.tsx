import React from "react";
import styled, { css, useTheme } from "styled-components";
import { Column, Flexible, Row } from "@yper-script/react/app/widget/generic";
import { MaterialIcon, Text } from "@yper-script/react/app/widget/mixins";
import { useTranslation } from "react-i18next";
import { stringFromEnum } from "@yper-script/react/utils";
import {
  SubscriptionBillingPeriod,
  SubscriptionName,
} from "@yper-script/react/data/entity/subscription.entity";

/** Images */
const checkIcon = "/img/react/enrollment/green_check_icon.svg";

function SubscriptionCard(props: {
  name: SubscriptionName;
  period: SubscriptionBillingPeriod;
  selected: boolean;
  onClick?: any;
}) {
  const theme = useTheme();
  const tradName = stringFromEnum(SubscriptionName, props.name);
  const { t } = useTranslation([], {
    keyPrefix: `commercial_offers.${tradName}`,
  });
  const advantages = t(`advantages`, {
    returnObjects: true,
    defaultValue: [],
  }) as any[];
  const icon = `/img/react/enrollment/${tradName}_logo.svg`;
  const price =
    props.period == SubscriptionBillingPeriod.annually
      ? (parseInt(t("price")) * 10) / 12
      : parseInt(t("price"));
  const color =
    props.name == SubscriptionName.yper_start
      ? theme.color.secondary["200"]
      : SubscriptionName.yper_essential
      ? theme.color.primary["100"]
      : theme.color.secondary["500"];

  return (
    <>
      <FormulaContainer
        alignItems={"start"}
        selected={props.selected}
        clickable={props.onClick != null}
        justifyContent={"end"}
        onClick={
          props.onClick != null ? () => props?.onClick(props.name) : null
        }
      >
        <CheckImg
          src={checkIcon}
          alt={"check icon"}
          selected={props.selected}
        />
        <Banner color={color} />
        <Icon src={icon} alt={"offer Icon"} />
        <Flexible
          size={2}
          justifyContent={"start"}
          margin={{ left: "12px", top: "5px" }}
        >
          <Column>
            <Flexible justifyContent={"start"} alignItems={"center"}>
              <Text textStyle={theme.textTheme.headline.medium}>
                {t("short_name")}
              </Text>
              {props.name == SubscriptionName.yper_essential && (
                <PopularLabel
                  padding={{
                    left: "8px",
                    top: "2px",
                    right: "8px",
                    bottom: "2px",
                  }}
                  margin={{ left: "4px" }}
                  textStyle={theme.textTheme.body.small}
                >
                  POPULAIRE
                </PopularLabel>
              )}
            </Flexible>
            <Text textStyle={theme.textTheme.title.small}>
              {t("description")}
            </Text>
            <Text
              textStyle={theme.textTheme.body.small.copyWith({
                color: theme.color.primary["300"],
              })}
            >
              {t("description_more", { defaultValue: "" })}
            </Text>
            {advantages.slice(0, 3)?.map(advantage => (
              <Column key={advantage.title}>
                <Row
                  justifyContent="start"
                  alignItems="center"
                  margin={{ top: "4px" }}
                >
                  <MaterialIcon
                    color={theme.color.success["400"]}
                    name="check"
                  />
                  <Text
                    margin={{ left: "4px" }}
                    textStyle={theme.textTheme.body.small}
                  >
                    {advantage.title}
                  </Text>
                </Row>
                {advantage.more && (
                  <Text
                    textStyle={theme.textTheme.body.small.copyWith({
                      color: theme.color.primary["300"],
                      style: "italic",
                    })}
                    margin={{ left: "24px" }}
                  >
                    {advantage.more}
                  </Text>
                )}
              </Column>
            ))}
          </Column>
        </Flexible>
        <Flexible size={1} margin={{ top: "13px" }}>
          <Column justifyContent={"flex-end"} alignItems={"flex-end"}>
            <Row justifyContent={"flex-end"} alignItems={"center"}>
              <Text
                textStyle={theme.textTheme.headline.large.copyWith({
                  color: theme.color.primary["400"],
                })}
              >
                {price}€
              </Text>
              <Text
                margin={{ top: "15px", left: "5px" }}
                textStyle={theme.textTheme.body.large.copyWith({
                  color: theme.color.primary["300"],
                })}
              >
                H.T/mois
              </Text>
            </Row>
            <Text
              textStyle={theme.textTheme.body.small.copyWith({
                color: theme.color.primary["300"],
              })}
            >
              par point de vente
            </Text>
            {props.period == SubscriptionBillingPeriod.annually &&
              props.name !== SubscriptionName.yper_start && (
                <Text
                  textStyle={theme.textTheme.body.small.copyWith({
                    color: theme.color.primary["300"],
                    style: "italic",
                  })}
                  margin={{ top: "8px" }}
                  textAlign={"right"}
                >
                  {`au lieu de ${price + price * 0.2}€/mois`}
                  <br />
                  Engagement d'un an payable en une fois
                </Text>
              )}
          </Column>
        </Flexible>
      </FormulaContainer>
    </>
  );
}

export default SubscriptionCard;

/** Styled Component */
const PopularLabel = styled(Text)`
  background: ${props => props.theme.color.secondary["300"]};
  border-radius: 12px;
`;

const CheckImg = styled.img<any>`
  display: none;
  position: absolute;
  top: 18px;
  right: 18px;
  ${props =>
    props.selected &&
    css`
      display: block;
    `}
`;

const FormulaContainer = styled(Row)<{ selected: boolean; clickable: boolean }>`
  position: relative;
  width: 100%;
  padding: 16px 16px 16px 0;
  background-color: ${props => props.theme.color.grayscale["000"]};
  border: 1px solid ${props => props.theme.color.primary["200"]};
  border-radius: 8px;
  cursor: ${props => (props.clickable ? "pointer" : "auto")};

  ${props =>
    props.clickable &&
    css`
      &:hover {
        box-shadow: 0 2px 6px rgba(54, 80, 108, 0.2);
      }
    `}

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
