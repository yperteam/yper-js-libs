import React, { useEffect, useState } from "react";
import {
  useRecoilValueLoadable,
  useRecoilValue,
  useSetRecoilState,
  useRecoilCallback,
  useRecoilState,
} from "recoil";
import { ProSubscriptionsNotifier } from "@yper-script/react/app/notifiers/subscription/subscription_notifier";
import {
  CardBody,
  CardHeader,
  CardTitle,
  MainCard,
} from "@yper-script/react/app/widget/card";
import styled, { useTheme } from "styled-components";
import {
  Column,
  Expanded,
  Row,
  Spacing,
} from "@yper-script/react/app/widget/generic";
import { ButtonLoader } from "@yper-script/react/app/widget/loader";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "@yper-script/react/app/widget/button";
import { MaterialIcon, Text } from "@yper-script/react/app/widget/mixins";
import CustomLoader from "@yper-script/react/app/widget/loader";
import {
  SubscriptionBillingPeriod,
  SubscriptionName,
} from "@yper-script/react/data/entity/subscription.entity";
import SubscriptionCard from "@yper-script/react/app/widget/subscription/subscription_card";
import { SubscriptionInterface } from "@yper-script/react/app/widget/subscription/compare_subscription_dialog";
import { useTranslation } from "react-i18next";
import { PreviewSubscriptionNotifier } from "@yper-script/react/app/notifiers/subscription/preview_subscription_notifier";
import { ChangeSubscriptionNotifier } from "@yper-script/react/app/notifiers/subscription/change_subscription_notifier";
import { ErrorModalNotifier } from "@yper-script/react/app/notifiers/error_modal_notifier";
import { ProStorage } from "@yper-script/react/data/provider/local/pro_storage";
import { PaymentNotifier } from "@yper-script/react/app/notifiers/subscription/payment_notifier";
import SuccessModal from "./success_modal";
import {
  getBillingPeriod,
  getSubscriptionEnd,
  getSubscriptionName,
} from "./utils";
import DowngradeModal from "./downgrade_modal";
import moment from "moment";
import AddPaymentModal from "../payment_method/add_payment_modal";
import { NoPaymentMethodRegistered } from "@yper-script/react/domain/usecase/subscription/add_pro_subscription";
import { AddPaymentMethodNotifier } from "@yper-script/react/app/notifiers/payment_method/add_payment_method_notifier";
import { PreviewSubscriptionChange } from "@yper-script/react/domain/usecase/subscription/preview_subscription_change";
import { useStripe } from "@stripe/react-stripe-js";

const lockIcon = "/img/react/icon/ic_lock.svg";
const checkIcon = "/img/react/icon/ic_check.svg";

function getRanking(subscription: SubscriptionInterface): number {
  switch (subscription.name) {
    case SubscriptionName.yper_start:
      return 0;
    case SubscriptionName.yper_essential:
      return 1;
    case SubscriptionName.yper_premium:
      return 2;
  }
}

function ChangeSubscription() {
  const loadable = useRecoilValueLoadable(ProSubscriptionsNotifier.provider);
  const theme = useTheme();
  const name = getSubscriptionName();
  const [period, setPeriod] = useState(getBillingPeriod());
  const { t } = useTranslation([], { keyPrefix: `commercial_offers.${name}` });

  const previewLoadable = useRecoilValueLoadable(
    PreviewSubscriptionNotifier.provider({
      name: name,
      period: period,
    })
  );

  if (loadable.state == "loading" || previewLoadable.state == "loading") {
    return <CustomLoader />;
  } else if (
    loadable.state == "hasError" ||
    previewLoadable.state == "hasError"
  ) {
    return <div></div>; // TODO
  }

  const lastSubscription = loadable.contents[0];
  const isAnnual = period == SubscriptionBillingPeriod.annually;
  const basicPrice = PreviewSubscriptionChange.basePrices[name];
  const price = isAnnual ? (basicPrice * 10) / 12 : basicPrice;
  const rankingDiff =
    getRanking({ name: name, period: period }) -
    getRanking({
      name: lastSubscription.name,
      period: lastSubscription.billingPeriod,
    });
  const textDetailStyle = theme.textTheme.body.large.copyWith({
    color: theme.color.primary[300],
  });
  const retailpointNb = previewLoadable.contents.rpQuantity;

  return (
    <Row margin={{ bottom: "24px", top: "24px" }}>
      <ColumnContent>
        <ButtonSecondary
          margin={{ bottom: "24px" }}
          onClick={() => (window.location.href = "/account/subscription")}
        >
          <Row alignItems="center">
            <CustomMaterialIcon name="arrow_backward" />
            <Text
              margin={{ left: "4px" }}
              textStyle={theme.textTheme.label.large}
            >
              Retour à ma formule
            </Text>
          </Row>
        </ButtonSecondary>
        <MainCard>
          <CardHeader>
            <Row justifyContent={"space-between"}>
              <CardTitle alignItems="center">
                <MaterialIcon color={theme.color.primary[400]} name="style" />
                <span>Changer de formule</span>
              </CardTitle>
            </Row>
          </CardHeader>
          <CardBody>
            <Column
              padding={{
                left: "24px",
                right: "24px",
                bottom: "16px",
                top: "24px",
              }}
            >
              <Text textStyle={textDetailStyle} margin={{ bottom: "4px" }}>
                Offre sélectionnée
              </Text>
              <SubscriptionCard name={name} period={period} selected={true} />
              <Divider margin={{ top: "24px", bottom: "24px" }} />
              {name != SubscriptionName.yper_start && (
                <Row justifyContent="space-between">
                  <Text textStyle={textDetailStyle}>Modalités de paiement</Text>
                  <Column alignItems="end">
                    <Text textStyle={theme.textTheme.body.large}>
                      {period == SubscriptionBillingPeriod.monthly
                        ? "Paiement mensuel, renouvellement automatique"
                        : "Paiement annuel, renouvellement automatique"}
                    </Text>
                    {period == SubscriptionBillingPeriod.monthly && (
                      <UnderlinedOffer
                        textStyle={theme.textTheme.title.small.copyWith({
                          color: theme.color.information[400],
                        })}
                        onClick={() =>
                          setPeriod(SubscriptionBillingPeriod.annually)
                        }
                      >
                        Bénéficiez de 2 mois offerts en payant à l'année !
                      </UnderlinedOffer>
                    )}
                  </Column>
                </Row>
              )}
              {name != SubscriptionName.yper_start && (
                <Divider margin={{ top: "24px", bottom: "24px" }} />
              )}
              <Row justifyContent="space-between">
                <Text margin={{ right: "24px" }} textStyle={textDetailStyle}>
                  Date d'effet du changement
                </Text>
                <Expanded justifyContent="end">
                  {name == SubscriptionName.yper_start ? (
                    <Column alignItems="end">
                      <Text textStyle={theme.textTheme.body.large}>
                        {getSubscriptionEnd(lastSubscription).format(
                          "D MMMM YYYY"
                        )}
                      </Text>
                      <Text
                        textAlign="right"
                        textStyle={theme.textTheme.body.medium.copyWith({
                          color: theme.color.primary[300],
                        })}
                      >
                        À cette date, votre offre actuelle et les avantages liés
                        prendront fin, et votre nouvelle offre démarrera
                        automatiquement.
                      </Text>
                    </Column>
                  ) : (
                    <DueDate name={name} period={period} />
                  )}
                </Expanded>
              </Row>
              <Divider margin={{ top: "24px", bottom: "24px" }} />
              {name != SubscriptionName.yper_start && (
                <Column>
                  <Row justifyContent="space-between">
                    <Text textStyle={theme.textTheme.body.large}>
                      {retailpointNb} point{retailpointNb > 1 ? "s" : ""} de
                      vente avec offre {t("short_name")}
                    </Text>
                    {isAnnual ? (
                      <Row alignItems="center">
                        <CrossedText
                          margin={{ right: "8px" }}
                          textStyle={theme.textTheme.body.medium.copyWith({
                            color: theme.color.primary[300],
                          })}
                        >
                          {(basicPrice * retailpointNb * 12).toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                            }
                          )}
                          € HT/an
                        </CrossedText>
                        <Text
                          textStyle={theme.textTheme.body.large.copyWith({
                            color: theme.color.information[400],
                          })}
                        >
                          {(price * retailpointNb * 12).toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                            }
                          )}
                          € HT/an
                        </Text>
                      </Row>
                    ) : (
                      <Text textStyle={theme.textTheme.body.large}>
                        {(price * retailpointNb).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                        € HT/mois
                      </Text>
                    )}
                  </Row>
                  <Text
                    textStyle={theme.textTheme.body.large.copyWith({
                      color: theme.color.primary["300"],
                    })}
                  >
                    {retailpointNb} x{" "}
                    {isAnnual ? (
                      <HighlightedText>
                        {price.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                        € HT
                      </HighlightedText>
                    ) : (
                      `${price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}€ HT`
                    )}{" "}
                    {isAnnual && " x 12 mois"}
                  </Text>
                  {/* TODO Essential annual > Premium monthly */}
                  {lastSubscription.name != SubscriptionName.yper_start &&
                    (rankingDiff > 0 ? (
                      <Text padding={{ top: "16px" }}>
                        Nous effectuerons un pro-rata du nombre de jours
                        d'utilisation restants de votre ancienne formule sur
                        votre prochaine facture. Le montant à payer aujourd'hui
                        correspond au prix de votre nouvelle formule, retranché
                        du nombre de jours d'utilisation restants sur ce mois.
                      </Text>
                    ) : (
                      <Text padding={{ top: "16px" }}>
                        Le changement d'offre sera répercuté sur la facture
                        suivant sa date d'effet.
                      </Text>
                    ))}
                  <TotalAmount name={name} period={period} />
                  <Divider margin={{ top: "24px", bottom: "24px" }} />
                </Column>
              )}
              <Row justifyContent="end">
                <ButtonSecondary
                  margin={{ right: "20px" }}
                  onClick={() =>
                    window.location.replace("/account/subscription")
                  }
                >
                  <Text textStyle={theme.textTheme.label.large}>Annuler</Text>
                </ButtonSecondary>
                <SubmitButton
                  name={name}
                  period={period}
                  isDowngrade={rankingDiff < 0}
                />
              </Row>
            </Column>
          </CardBody>
        </MainCard>
      </ColumnContent>
    </Row>
  );
}

function DueDate(props: {
  name: SubscriptionName;
  period: SubscriptionBillingPeriod;
}) {
  const theme = useTheme();
  const preview = useRecoilValue(
    PreviewSubscriptionNotifier.provider({
      name: props.name,
      period: props.period,
    })
  );

  const date = preview.dueDate ?? new Date();

  return moment(date).isSame(new Date(), "day") ? (
    <Text textAlign="right" textStyle={theme.textTheme.body.large}>
      Immédiat
    </Text>
  ) : (
    <Column alignItems="end">
      <Text textStyle={theme.textTheme.body.large}>
        {moment(date).format("D MMMM YYYY")}
      </Text>
      <Text
        textAlign="right"
        textStyle={theme.textTheme.body.medium.copyWith({
          color: theme.color.primary[300],
        })}
      >
        À cette date, votre offre actuelle et les avantages liés prendront fin,
        et votre nouvelle offre démarrera automatiquement.
      </Text>
    </Column>
  );
}

function TotalAmount(props: {
  name: SubscriptionName;
  period: SubscriptionBillingPeriod;
}) {
  const theme = useTheme();
  const preview = useRecoilValue(
    PreviewSubscriptionNotifier.provider({
      name: props.name,
      period: props.period,
    })
  );

  const previewDate = moment(preview.dueDate ?? new Date());

  return (
    <Row justifyContent="space-between" margin={{ top: "16px" }}>
      <Text
        textStyle={theme.textTheme.title.medium.copyWith({
          color: theme.color.primary["500"],
        })}
      >
        À payer{" "}
        {previewDate.isSame(new Date(), "day")
          ? "aujourd'hui"
          : `le ${previewDate.format("D MMMM YYYY")}`}
      </Text>
      <Text
        textStyle={theme.textTheme.title.medium.copyWith({
          color: theme.color.primary["500"],
        })}
      >
        {preview.amount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
        })}
        € HT
      </Text>
    </Row>
  );
}

function SubmitButton(props: {
  name: SubscriptionName;
  period: SubscriptionBillingPeriod;
  isDowngrade: boolean;
}) {
  const theme = useTheme();
  const preview = useRecoilValue(
    PreviewSubscriptionNotifier.provider({
      name: props.name,
      period: props.period,
    })
  );
  const loadable = useRecoilValue(ChangeSubscriptionNotifier.provider);
  const errorModal = useSetRecoilState(ErrorModalNotifier.dialogProvider);
  const [successModal, showModal] = useRecoilState(
    PaymentNotifier.successDialogProvider
  );
  const [paymentModal, showPaymentModal] = useRecoilState(
    PaymentNotifier.dialogProvider
  );
  const [downgradeModal, showDowngradeModal] = useRecoilState(
    PaymentNotifier.downgradeDialogProvider
  );

  const paymentLoadable = useRecoilValue(AddPaymentMethodNotifier.provider);

  const notifier = useRecoilCallback(
    callback => () => {
      ChangeSubscriptionNotifier.notifier(props.name, props.period, callback);
    },
    [props.name, props.period]
  );

  useEffect(() => {
    if (loadable?.state == "hasValue") {
      showPaymentModal(false);
      showModal(true);
    }
    // TODO loading dialog
    if (loadable?.state == "hasError") {
      if (loadable.contents instanceof NoPaymentMethodRegistered) {
        showPaymentModal(true);
      } else {
        showPaymentModal(false);
        errorModal({ display: true });
      }
    }
  }, [loadable]);

  useEffect(() => {
    if (
      paymentLoadable?.state == "hasValue" &&
      loadable?.state == "hasError" &&
      loadable.contents instanceof NoPaymentMethodRegistered
    ) {
      notifier();
    }
  }, [paymentLoadable]);

  const payNow = moment(preview.dueDate).isSame(new Date(), "day");

  return (
    <>
      <ButtonPrimary
        onClick={() => {
          if (props.isDowngrade) showDowngradeModal(true);
          else notifier();
        }}
      >
        {loadable?.state == "loading" ? (
          <ButtonLoader />
        ) : preview.amount <= 0 || !payNow ? (
          <Row alignItems="center">
            <img height="16px" src={checkIcon} alt="check icon" />
            <Text
              margin={{ left: "8px" }}
              textStyle={theme.textTheme.label.large.copyWith({
                color: theme.color.grayscale["000"],
              })}
            >
              Confirmer
            </Text>
          </Row>
        ) : (
          <Row alignItems="center">
            <img height="14px" src={lockIcon} alt="lock icon" />
            <Text
              margin={{ left: "8px" }}
              textStyle={theme.textTheme.label.large.copyWith({
                color: theme.color.grayscale["000"],
              })}
            >
              Valider et payer
            </Text>
          </Row>
        )}
      </ButtonPrimary>
      {successModal && <SuccessModal payedSuccess={preview.amount > 0} />}
      {downgradeModal && (
        <DowngradeModal newSubscription={props.name} notifier={notifier} />
      )}
      {paymentModal && (
        <AddPaymentModal title="Ajoutez un moyen de paiement pour confirmer votre achat" />
      )}
    </>
  );
}

export default ChangeSubscription;

const UnderlinedOffer = styled(Text)`
  text-decoration: underline;
  cursor: pointer;
`;

const Divider = styled(Spacing)`
  height: 1px;
  background: ${props => props.theme.color.grayscale["200"]};
`;
const ColumnContent = styled(Column)`
  width: 60vw;
`;

const CustomMaterialIcon = styled(MaterialIcon)`
  max-width: 20px;
  height: 14px;
  font-size: 16px !important;
`;

const HighlightedText = styled.span`
  color: ${props => props.theme.color.information["400"]};
`;

const CrossedText = styled(Text)`
  text-decoration: line-through;
`;
