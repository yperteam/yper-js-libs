import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
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
import CardField from "@yper-script/react/app/widget/payment_method/card_field";
import {
  IbanField,
  ibanSchema,
} from "@yper-script/react/app/widget/payment_method/iban_field";
import { FormProvider, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from "recoil";
import { ChangeSubscriptionNotifier } from "@yper-script/react/app/notifiers/subscription/change_subscription_notifier";
import EnrollmentScreen from "@yper-script/react/app/screen/enrollment/enrollment_screen";
import { enumFromString } from "@yper-script/react/utils";
import {
  SubscriptionBillingPeriod,
  SubscriptionName,
} from "@yper-script/react/data/entity/subscription.entity";
import { useTranslation } from "react-i18next";
import { ErrorModalNotifier } from "@yper-script/react/app/notifiers/error_modal_notifier";
import { useFormContext } from "react-hook-form";
import { ButtonLoader } from "../../widget/loader";
import { SubscriptionInterface } from "@yper-script/react/app/widget/subscription/compare_subscription_dialog";
import { AddPaymentMethodNotifier } from "@yper-script/react/app/notifiers/payment_method/add_payment_method_notifier";

function getSubscriptionName(): SubscriptionName {
  const query = new URLSearchParams(window.location.search);
  return (
    enumFromString<SubscriptionName>(
      SubscriptionName,
      query.get("subscription")
    ) ?? SubscriptionName.yper_essential
  );
}

function getBillingPeriod(): SubscriptionBillingPeriod {
  const query = new URLSearchParams(window.location.search);
  return (
    enumFromString<SubscriptionBillingPeriod>(
      SubscriptionBillingPeriod,
      query.get("billing_period")
    ) ?? SubscriptionBillingPeriod.annually
  );
}

function EnrollmentPayment() {
  const theme = useTheme();
  const methods = useForm({
    reValidateMode: "onSubmit",
    resolver: joiResolver(ibanSchema),
  });
  const [usingCard, useCard] = useState(true);
  const subscriptionName = getSubscriptionName();
  const billingPeriod = getBillingPeriod();
  const loadable = useRecoilValue(ChangeSubscriptionNotifier.provider);
  const { t } = useTranslation([], {
    keyPrefix: `commercial_offers.${subscriptionName}`,
  });
  const errorModal = useSetRecoilState(ErrorModalNotifier.dialogProvider);
  const price =
    billingPeriod == SubscriptionBillingPeriod.annually
      ? parseInt(t("price")) * 10
      : parseInt(t("price"));

  useEffect(() => {
    if (loadable?.state == "hasValue") {
      window.location.href = "/enrolment/success";
    }
    if (loadable?.state == "hasError") {
      errorModal({ display: true });
    }
  }, [loadable]);

  return (
    <FormProvider {...methods}>
      <EnrollmentScreen>
        <Row justifyContent={"start"} alignItems={"center"}>
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
            Mon mode de paiement :
          </Text>
        </Row>
        <Text
          margin={{ top: "2.5rem", bottom: "0.7rem" }}
          textStyle={theme.textTheme.body.medium.copyWith({
            color: theme.color.primary[300],
          })}
        >
          On y est presque plus qu'une étape !<br />
          Choisissez votre moyen de paiement, puis renseignez le champ
          approprié.
        </Text>
        <FormulaContainer>
          <Flexible size={3}>
            <Column>
              <Text textStyle={theme.textTheme.body.large}>
                À payer aujourd'hui
              </Text>
              <Text
                textStyle={theme.textTheme.body.small.copyWith({
                  color: theme.color.primary["300"],
                })}
              >
                {`Première ${
                  billingPeriod == SubscriptionBillingPeriod.annually
                    ? "annualité"
                    : "mensualité"
                } de votre offre ${t("short_name")} x 1 point de vente`}
              </Text>
            </Column>
          </Flexible>
          <Flexible size={1} justifyContent={"flex-end"}>
            <Text textStyle={theme.textTheme.label.medium}>
              {price.toFixed(2)}€ HT
            </Text>
          </Flexible>
        </FormulaContainer>
        <CheckboxMethod
          alignItems={"center"}
          justifyContent={"start"}
          onClick={() => useCard(true)}
          margin={{ top: "25px" }}
        >
          <CheckboxInput type="checkbox" checked={usingCard} readOnly={true} />
          <Text margin={{ left: "6px" }}>Carte bancaire</Text>
        </CheckboxMethod>
        {usingCard && (
          <Spacing margin={{ top: "16px" }}>
            <CardField name="card" />
          </Spacing>
        )}
        <CheckboxMethod
          margin={{ top: "2.5rem" }}
          alignItems={"center"}
          justifyContent={"start"}
          onClick={() => useCard(false)}
        >
          <CheckboxInput type="checkbox" checked={!usingCard} readOnly={true} />
          <Text margin={{ left: "6px" }}>Prélèvement bancaire</Text>
        </CheckboxMethod>
        {!usingCard && (
          <Spacing margin={{ top: "16px" }}>
            <IbanField />{" "}
          </Spacing>
        )}
        <Row margin={{ top: "45px" }} justifyContent={"flex-end"}>
          <Flexible justifyContent={"flex-start"}>
            <ButtonSecondary
              onClick={() => (window.location.href = "/enrolment/offer")}
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
          {subscriptionName == SubscriptionName.yper_start && (
            <ButtonSecondary
              onClick={() => (window.location.href = "/enrolment/success")}
              margin={{ right: "5px" }}
            >
              <Text textStyle={theme.textTheme.label.medium}>
                Passer cette étape
              </Text>
            </ButtonSecondary>
          )}
          <SubmitButton
            usingCard={usingCard}
            subscription={{ name: subscriptionName, period: billingPeriod }}
          />
        </Row>
      </EnrollmentScreen>
    </FormProvider>
  );
}

function SubmitButton(props: {
  usingCard: boolean;
  subscription: SubscriptionInterface;
}) {
  const theme = useTheme();
  const { handleSubmit } = useFormContext();
  const loadable = useRecoilValue(ChangeSubscriptionNotifier.provider);
  const paymentLoadable = useRecoilValue(AddPaymentMethodNotifier.provider);

  const notifier = useRecoilCallback(
    callback => () => {
      if (props.usingCard) {
        AddPaymentMethodNotifier.cardNotifier(callback);
      } else {
        handleSubmit(data =>
          AddPaymentMethodNotifier.ibanNotifier(data.name, data.email, callback)
        )();
      }
    },
    [props.usingCard]
  );

  const subscriptionNotifier = useRecoilCallback(
    callback => () => {
      ChangeSubscriptionNotifier.notifier(
        props.subscription.name,
        props.subscription.period,
        callback
      );
    },
    [props.subscription]
  );

  useEffect(() => {
    if (paymentLoadable?.state == "hasValue") {
      subscriptionNotifier();
    }
  }, [paymentLoadable]);

  return (
    <ButtonPrimary onClick={notifier}>
      {loadable?.state != "loading" && paymentLoadable?.state != "loading" ? (
        <Text
          textStyle={theme.textTheme.label.medium.copyWith({
            color: theme.color.grayscale["000"],
          })}
        >
          Valider
        </Text>
      ) : (
        <ButtonLoader />
      )}
    </ButtonPrimary>
  );
}

export default EnrollmentPayment;

const CheckboxMethod = styled(Row)`
  cursor: pointer;
`;

const FormulaContainer = styled(Row)`
  background-color: ${props => props.theme.color.primary["100"]};
  padding: 16px 20px;
`;

const CheckboxInput = styled.input`
  position: relative;
  width: 15px;
  height: 15px;
  float: left;
  margin: 4px 10px 2px 1px;
  border-radius: 50%;
  vertical-align: middle;
  border: 1px solid ${props => props.theme.color.primary["400"]};
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;
  transition: 0.5s;
  padding: 6px;
  box-shadow: inset 0 0 0 2px ${props => props.theme.color.grayscale["000"]};

  &:checked {
    background-color: ${props => props.theme.color.primary["400"]};
    box-shadow: inset 0 0 0 2px ${props => props.theme.color.grayscale["000"]};
    transition: 0.5s;
    padding: 6px;
  }
`;

const CustomMaterialIcon = styled(MaterialIcon)`
  max-width: 20px;
`;
