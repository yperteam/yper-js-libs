import React, { useEffect } from "react";
import styled, { css, useTheme } from "styled-components";
import {
  Column,
  Flexible,
  Row,
  Spacing,
} from "@yper-script/react/app/widget/generic";
import CustomLoader, {
  ButtonLoader,
} from "@yper-script/react/app/widget/loader";
import {
  MaterialIcon,
  SvgPicture,
  Text,
} from "@yper-script/react/app/widget/mixins";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "@yper-script/react/app/widget/button";
import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import { PaymentMethodNotifier } from "@yper-script/react/app/notifiers/payment_method/payment_method_notifier";
import { OrderNotifier } from "@yper-script/react/app/notifiers/order/order_notifier";
import { CurrentProNotifier } from "@yper-script/react/app/notifiers/pro/current_pro_notifier";
import { Item, Order } from "@yper-script/react/data/entity/order.entity";
import CardField from "@yper-script/react/app/widget/payment_method/card_field";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { OrderPaymentNotifier } from "@yper-script/react/app/notifiers/order/order_payment_notifier";
import { PrebookNotifier } from "@yper-script/react/app/notifiers/order/prebook_notifier";
import { Mission } from "@yper-script/react/data/entity/mission.entity";
import {
  ConfirmOrderModal,
  provider as modalProvider,
} from "../confirm_order_modal";
import { AddPaymentMethodNotifier } from "@yper-script/react/app/notifiers/payment_method/add_payment_method_notifier";
import {
  provider,
  DynamicCardModal,
} from "@yper-script/react/app/screen/order/payment/dynamic_card_modal";

const cardIcon = "/img/react/icon/ic_credit_card_lock.svg";
const bagIcon = "/img/react/icon/ic_shopping_bag.svg";
const storeIcon = "/img/react/icon/ic_store_bag.svg";

function OrderPaymentScreen() {
  const theme = useTheme();

  /** Values */
  const orderId = window.location.pathname.split("/")[3];
  const orderLoadable = useRecoilValue(OrderNotifier.provider(orderId));
  const paymentMethodsLoadable = useRecoilValue(
    PaymentMethodNotifier.withTypeProvider("card")
  );
  const [modalConfirm, setModalConfirm] = useRecoilState(modalProvider);
  const notifier = useRecoilCallback(
    callback => async () => {
      methods.handleSubmit(data => {
        OrderPaymentNotifier.notifier(orderId, callback, data.methodId);
        setModalConfirm(true);
      })();
    },
    []
  );

  if (
    paymentMethodsLoadable.state == "loading" ||
    orderLoadable.state == "loading"
  ) {
    return <CustomLoader />;
  } else if (
    paymentMethodsLoadable.state == "hasError" ||
    orderLoadable.state == "hasError"
  ) {
    return <></>;
  }

  const order: Order = orderLoadable.contents;
  const lastPaymentMethod =
    paymentMethodsLoadable.contents[paymentMethodsLoadable.contents.length - 1];
  const methods = useForm({
    defaultValues: {
      methodId: lastPaymentMethod?.id,
    },
  });

  return (
    <>
      <FormProvider {...methods}>
        <FormContainer onSubmit={methods.handleSubmit(_ => {})}>
          <Column alignItems="center">
            <Row justifyContent={"center"} alignItems={"center"}>
              <Arrow> {">"} </Arrow>
              <Text textStyle={theme.textTheme.headline.large}>
                Paiement de ma commande
              </Text>
            </Row>
            <Card margin={{ top: "24px" }}>
              <Row
                justifyContent="start"
                alignItems="center"
                padding={{
                  top: "12px",
                  bottom: "12px",
                  left: "12px",
                  right: "12px",
                }}
              >
                <SvgPicture src={bagIcon} />
                <Text
                  margin={{ left: "12px" }}
                  textStyle={theme.textTheme.title.medium}
                >
                  Récapitulatif de la commande
                </Text>
              </Row>
              <Divider />
              {order.items.map(i => (
                <OrderItem item={i} />
              ))}
              <Row
                padding={{
                  top: "12px",
                  bottom: "12px",
                  left: "12px",
                  right: "12px",
                }}
                width="auto"
              >
                <Flexible />
                <Column margin={{ right: "16px" }} alignItems="end">
                  <Text>Total HT</Text>
                  <Text margin={{ top: "4px", bottom: "4px" }}>TVA</Text>
                  <Text
                    textStyle={theme.textTheme.body.large.copyWith({
                      color: theme.color.primary[300],
                      fontWeight: "700",
                    })}
                  >
                    Total TTC
                  </Text>
                </Column>
                <Column alignItems="end">
                  <Text>{order.price.totalHt.toFixed(2)} €</Text>
                  <Text margin={{ top: "4px", bottom: "4px" }}>
                    {order.price.tva.toFixed(2)} €
                  </Text>
                  <Text
                    textStyle={theme.textTheme.body.large.copyWith({
                      color: theme.color.primary[500],
                      fontWeight: "700",
                    })}
                  >
                    {(order.price.totalHt + order.price.tva).toFixed(2)} €
                  </Text>
                </Column>
              </Row>
            </Card>
            <Card margin={{ top: "24px", bottom: "24px" }}>
              <Row
                justifyContent="start"
                alignItems="center"
                padding={{
                  top: "12px",
                  bottom: "12px",
                  left: "12px",
                  right: "12px",
                }}
              >
                <SvgPicture src={storeIcon} />
                <Text
                  margin={{ left: "12px" }}
                  textStyle={theme.textTheme.title.medium}
                >
                  Informations de facturation
                </Text>
              </Row>
              <Divider />
              <OrderDetailsInfo />
            </Card>
            <Card margin={{ bottom: "24px" }}>
              <Row
                justifyContent="start"
                alignItems="center"
                padding={{
                  top: "12px",
                  bottom: "12px",
                  left: "12px",
                  right: "12px",
                }}
              >
                <SvgPicture src={cardIcon} />
                <Text
                  margin={{ left: "12px" }}
                  textStyle={theme.textTheme.title.medium}
                >
                  Choisissez un moyen de paiement
                </Text>
              </Row>
              <Divider />
              <PaymentMethodsList />
            </Card>
            <ButtonPrimary width="70%" onClick={notifier}>
              <Row alignItems="center">
                <SvgPicture
                  src="/img/react/icon/ic_check.svg"
                  height="16px"
                  width="16px"
                />
                <Text
                  textStyle={theme.textTheme.label.large}
                  padding={{ left: "10px" }}
                >
                  Payer {(order.price.totalHt + order.price.tva).toFixed(2)}€
                  TTC
                </Text>
              </Row>
            </ButtonPrimary>
          </Column>
        </FormContainer>
      </FormProvider>
      {modalConfirm && (
        <ConfirmOrderModal orderId={orderId} prebookId={order.items[0].id} />
      )}
    </>
  );
}

function OrderItem({ item }: { item: Item }) {
  const theme = useTheme();
  // TODO handle other types of item
  const state = useRecoilValue(PrebookNotifier.provider(item.id));

  if (state.state == "loading") {
    return <CustomLoader />;
  } else if (state.state == "hasError") {
    return <></>; // TODO ?
  }

  const mission: Mission = state.contents;
  return (
    <Column>
      <Row
        padding={{
          top: "12px",
          bottom: "12px",
          left: "12px",
          right: "12px",
        }}
        alignItems="center"
      >
        <Flexible>
          <Column width="100%">
            <Text>Réservation {mission.order?.id}</Text>
            <Text>
              Pour {mission.receiver?.firstname} {mission.receiver?.lastname} à{" "}
              {mission.receiver?.address?.city}
            </Text>
          </Column>
        </Flexible>
        <Text textStyle={theme.textTheme.label.medium}>
          {item.price.totalHt.toFixed(2)} € HT
        </Text>
      </Row>
      <Divider />
    </Column>
  );
}

function OrderDetailsInfo() {
  const pro = useRecoilValue(CurrentProNotifier.provider);
  const theme = useTheme();

  return (
    <Row padding={{ top: "16px", bottom: "16px", left: "16px", right: "16px" }}>
      <Column>
        <Text
          textStyle={theme.textTheme.body.medium.copyWith({
            color: theme.color.primary[300],
          })}
        >
          Société
        </Text>
        <Text>{pro.companyInfos.name}</Text>
        <Text>{pro.companyInfos.address.formattedAddress}</Text>
      </Column>
      {pro.companyInfos.tvaNumber && (
        <Column>
          <Text
            textStyle={theme.textTheme.body.medium.copyWith({
              color: theme.color.primary[300],
            })}
          >
            N° de TVA intracommunautaire
          </Text>
          <Text>{pro.companyInfos.tvaNumber}</Text>
        </Column>
      )}
    </Row>
  );
}

function PaymentMethodsList() {
  const theme = useTheme();
  const methods = useFormContext();
  const [dynamicModal, showDynamicModal] = useRecoilState(provider);
  const paymentMethods = useRecoilValue(
    PaymentMethodNotifier.withTypeProvider("card")
  ).contents;
  const selectedMethod = methods.watch("methodId");

  return (
    <Column
      padding={{ top: "16px", left: "16px", right: "16px", bottom: "16px" }}
    >
      {paymentMethods.map(m => (
        <CheckboxMethod
          width="100%"
          key={"payment-method-" + m.id}
          alignItems="center"
          justifyContent="start"
          onClick={() => methods.setValue("methodId", m.id)}
          selected={selectedMethod == m.id}
        >
          <CheckboxInput
            type="checkbox"
            checked={selectedMethod == m.id}
            readOnly={true}
          />
          <Text padding={{ left: "16px" }}>
            {m.type == "card" ? "Carte bancaire" : "Compte bancaire"}
          </Text>
          <Text padding={{ left: "16px" }}>
            {" "}
            {m.type == "card"
              ? "●●●●   ●●●●   ●●●●  "
              : "●●●●  ●●●●  ●●●●  ●●●●  ●●●● "}{" "}
            {m.details.lastDigits}
            {/* TODO handle expired card */}
          </Text>
          {m.details.cardExpMonth != null && m.details.cardExpYear != null && (
            <Text
              padding={{ left: "16px" }}
              textStyle={theme.textTheme.body.medium}
            >
              Expire le {m.details.cardExpMonth}/{m.details.cardExpYear % 100}
            </Text>
          )}
        </CheckboxMethod>
      ))}
      <CheckboxMethod
        width="100%"
        alignItems="center"
        justifyContent="start"
        onClick={() => methods.setValue("methodId", null)}
        selected={false}
      >
        <CheckboxInput
          type="checkbox"
          checked={selectedMethod == null}
          readOnly={true}
        />
        <Text padding={{ left: "16px" }}>Ajouter un moyen de paiement</Text>
      </CheckboxMethod>
      {selectedMethod == null && <AddCardForm />}
      <ButtonSecondary
        margin={{ top: "24px" }}
        onClick={() => showDynamicModal(true)}
      >
        <Text padding={{ right: "10px" }}>
          J'ai une carte bancaire à cryptogramme dynamique
        </Text>
        <MaterialIcon name="arrow_forward" />
      </ButtonSecondary>
      {dynamicModal && <DynamicCardModal />}
    </Column>
  );
}

function AddCardForm() {
  const state = useRecoilValue(AddPaymentMethodNotifier.provider);
  const { setValue } = useFormContext();
  const notifier = useRecoilCallback(
    callback => async () => {
      AddPaymentMethodNotifier.cardNotifier(callback);
    },
    []
  );

  useEffect(() => {
    if (state?.state == "hasValue" && state.contents) {
      setValue("methodId", state.contents.id);
    }
  });

  return (
    <Spacing margin={{ top: "8px", left: "24px", right: "24px" }}>
      <CardField name="method" />
      <Row margin={{ top: "16px" }} justifyContent="end">
        <ButtonPrimary onClick={notifier}>
          {state?.state == "loading" ? (
            <ButtonLoader />
          ) : (
            <Text>Enregistrer ma carte</Text>
          )}
        </ButtonPrimary>
      </Row>
    </Spacing>
  );
}

export default OrderPaymentScreen;

/** Styled Component */
const FormContainer = styled.form`
  max-width: 700px;
  width: 100%;
  margin: 40px auto 64px auto;
  padding: 0 24px;
`;

const Arrow = styled.div`
  color: ${props => props.theme.color.secondary["400"]};
  font-size: 24px;
  line-height: 32px;
  margin-right: 5px;
`;

const Card = styled(Column)`
  background-color: ${props => props.theme.color.grayscale["000"]};
  box-shadow: 0 2px 20px rgba(54, 80, 108, 0.1);
  border-radius: 10px;
`;

const Divider = styled(Spacing)`
  height: 1px;
  background: ${props => props.theme.color.grayscale["200"]};
`;

const CheckboxMethod = styled(Row)<{ selected: boolean }>`
  cursor: pointer;
  border-radius: 4px;
  padding: 16px;
  border: 1px solid
    ${props =>
      props.selected
        ? props.theme.color.success["400"]
        : "rgba(255, 255, 255, 0)"};

  ${props =>
    props.selected &&
    css`
      background-color: ${props => props.theme.color.success["100"]};
      box-shadow: 0 0 9px rgba(54, 80, 108, 0.1);
    `}
`;

const CheckboxInput = styled.input`
  position: relative;
  width: 15px !important;
  height: 15px !important;
  min-width: 15px;
  float: left;
  margin: 4px 10px 2px 1px;
  border-radius: 50%;
  vertical-align: middle;
  border: 1px solid ${props => props.theme.color.primary["200"]};
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;
  transition: 0.5s;
  padding: 6px;
  background-color: ${props => props.theme.color.grayscale["000"]};
  box-shadow: inset 0 0 0 2px ${props => props.theme.color.grayscale["000"]};

  &:checked {
    background-color: ${props => props.theme.color.grayscale["000"]};
    border-color: ${props => props.theme.color.transparent};
    box-shadow: inset 0 0 0 4px ${props => props.theme.color.primary["400"]};
    transition: 0.5s;
    padding: 3px;
  }
`;
