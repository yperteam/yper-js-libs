import React, { ChangeEvent, useState } from "react";
import styled, { useTheme } from "styled-components";
import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import {
  CardBody,
  CardHeader,
  CardTitle,
  MainCard,
} from "@yper-script/react/app/widget/card";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
} from "styled-dropdown-component";
import CustomLoader from "@yper-script/react/app/widget/loader";
import {
  Column,
  Expanded,
  Flexible,
  Row,
  Spacing,
} from "@yper-script/react/app/widget/generic";
import { ButtonPrimary } from "@yper-script/react/app/widget/button";
import { MaterialIcon, Text } from "@yper-script/react/app/widget/mixins";
import { PaymentMethodNotifier } from "@yper-script/react/app/notifiers/payment_method/payment_method_notifier";
import { PaymentMethod } from "@yper-script/react/data/entity/payment_method.entity";
import { PrimaryPaymentMethodNotifier } from "@yper-script/react/app/notifiers/payment_method/primary_payment_method_notifier";
import { PaymentNotifier } from "@yper-script/react/app/notifiers/subscription/payment_notifier";
import AddPaymentModal from "./add_payment_modal";
import DeletePaymentModal from "./delete_payment_modal";

function PaymentMethodScreen() {
  document.title = "Yper.shop | Mes moyens de paiement";
  const theme = useTheme();
  const [paymentModal, showPaymentModal] = useRecoilState(
    PaymentNotifier.dialogProvider
  );

  return (
    <>
      <MainCard>
        <CardHeader>
          <CardTitle width="auto">
            <i className="material-icons">credit_card</i>
            <span>Mes moyens de paiement</span>
          </CardTitle>
          <Expanded></Expanded>
          <ButtonPrimary onClick={() => showPaymentModal(true)}>
            <Row>
              <MaterialIcon
                color={theme.color.grayscale["000"]}
                name="add_circle"
              />
              <Text
                textStyle={theme.textTheme.title.small.copyWith({
                  color: theme.color.grayscale["000"],
                })}
                margin={{ left: "5px" }}
              >
                Ajouter
              </Text>
            </Row>
          </ButtonPrimary>
        </CardHeader>
        <CardBody>
          <PaymentMethodList />
        </CardBody>
      </MainCard>
      {paymentModal && <AddPaymentModal title="Ajoutez un moyen de paiement" />}
    </>
  );
}

function PaymentMethodList() {
  const theme = useTheme();
  const loadable = useRecoilValue(PaymentMethodNotifier.provider);

  if (loadable.state == "hasError") return <div>Une erreur est survenue</div>;
  else if (loadable.state == "loading") return <CustomLoader />;

  return (
    <>
      {loadable.contents.length == 0 ? (
        <Text
          padding={{ top: "16px", bottom: "16px", left: "16px", right: "16px" }}
        >
          Vous n'avez actuellement aucun moyen de paiement enregistré.
        </Text>
      ) : (
        loadable.contents.map((p, i) => (
          <PaymentMethod
            background={
              i % 2 == 0
                ? theme.color.grayscale["000"]
                : theme.color.grayscale["100"]
            }
            nbMethods={loadable.contents.length}
            key={p.id}
            method={p}
          />
        ))
      )}
    </>
  );
}

function PaymentMethod(props: {
  method: PaymentMethod;
  background: string;
  nbMethods: number;
}) {
  const theme = useTheme();
  const [dropdown, setDropdown] = useState(false);
  const [deleteModal, showDeleteModal] = useRecoilState(
    PaymentNotifier.deleteDialogProvider
  );
  const hadMandate = props.method.details.mandateUrl != null;
  const isNotPrimary = !props.method.primary;
  const isNotSingle = props.nbMethods > 1;

  const primaryNotifier = useRecoilCallback(
    callback => () => {
      setDropdown(false);
      PrimaryPaymentMethodNotifier.notifier(props.method.id, callback);
    },
    []
  );

  return (
    <PaymentRow
      background={props.background}
      padding={{ left: "30px", right: "30px", top: "24px", bottom: "24px" }}
      alignItems="center"
    >
      <Spacing margin={{ right: "12px" }}>
        <RoundIcon
          name={props.method.type == "card" ? "credit_card" : "account_balance"}
        />
      </Spacing>
      <Flexible size={4}>
        <Column justifyContent="start" width="100%">
          <Text textStyle={theme.textTheme.title.small}>
            {props.method.type == "card" ? "Carte bancaire" : "Compte bancaire"}
          </Text>
          <Row justifyContent="start">
            <Text
              textStyle={theme.textTheme.body.small.copyWith({
                color: theme.color.grayscale["300"],
              })}
              margin={{ right: "24px" }}
            >
              {props.method.type == "card"
                ? "●●●●   ●●●●   ●●●●  "
                : "●●●●  ●●●●  ●●●●  ●●●●  ●●●● "}{" "}
              {props.method.details.lastDigits}
            </Text>
            {props.method.details.cardExpMonth != null &&
              props.method.details.cardExpYear != null && (
                <Flexible>
                  <Text
                    textStyle={theme.textTheme.body.small.copyWith({
                      color: theme.color.grayscale["300"],
                    })}
                  >
                    Expire le {props.method.details.cardExpMonth}/
                    {props.method.details.cardExpYear % 100}
                  </Text>
                </Flexible>
              )}
          </Row>
        </Column>
      </Flexible>
      {props.method.primary && (
        <Flexible>
          <Row alignItems="center">
            <PrimaryTag margin={{ right: "10px" }} />
            <Text
              textStyle={theme.textTheme.label.small.copyWith({
                color: theme.color.grayscale["500"],
              })}
            >
              PAR DÉFAUT
            </Text>
          </Row>
        </Flexible>
      )}
      {(hadMandate || isNotPrimary || isNotSingle) && (
        <Dropdown>
          <MoreButton
            margin={{ left: "12px" }}
            onClick={() => setDropdown(!dropdown)}
          >
            <MaterialIcon name="more_horiz" />
          </MoreButton>
          <CustomDropdownMenu
            right={true}
            hidden={!dropdown}
            toggle={() => setDropdown(!dropdown)}
          >
            {hadMandate && (
              <CustomDropdownItem
                onClick={() => window.open(props.method.details.mandateUrl)}
              >
                <Text textStyle={theme.textTheme.body.medium}>
                  Voir le mandat de prélevement
                </Text>
              </CustomDropdownItem>
            )}
            {isNotPrimary && (
              <CustomDropdownItem onClick={primaryNotifier}>
                <Text textStyle={theme.textTheme.body.medium}>
                  Définir par défaut
                </Text>
              </CustomDropdownItem>
            )}
            {isNotSingle && (
              <CustomDropdownItem
                onClick={() => {
                  setDropdown(false);
                  showDeleteModal(true);
                }}
              >
                <Text textStyle={theme.textTheme.body.medium}>Supprimer</Text>
              </CustomDropdownItem>
            )}
          </CustomDropdownMenu>
        </Dropdown>
      )}
      {deleteModal && <DeletePaymentModal methodId={props.method.id} />}
    </PaymentRow>
  );
}

export default PaymentMethodScreen;

const MoreButton = styled(Spacing)`
  cursor: pointer;
`;

const RoundIcon = styled(MaterialIcon)`
  background-color: ${props => props.theme.color.primary["100"]};
  border-radius: 50%;
  padding: 10px;
`;

const PrimaryTag = styled(Spacing)`
  background-color: ${props => props.theme.color.success["400"]};
  border-radius: 50%;
  width: 10px;
  height: 10px;
`;

const PaymentRow = styled(Row)<{ background: string }>`
  background: ${props => props.background};
`;

const CustomDropdownItem = styled(DropdownItem)`
  cursor: pointer;
  padding: 0.75rem 1.5rem !important;
`;

const CustomDropdownMenu = styled(DropdownMenu)`
  padding: 0 !important;
`;
