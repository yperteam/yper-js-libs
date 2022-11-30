import React, { useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { Text } from "../mixins";
import { CustomLoader } from "../loader";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StripePaymentNotifier } from "../../notifiers/stripe_payment_notifier";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";

export function CardField({ name }: { name: string }) {
  const loadable = useRecoilValueLoadable(StripePaymentNotifier.cardProvider);
  const theme = useTheme();
  const methods = useFormContext();

  if (loadable.state == "loading") {
    return <CustomLoader />;
  } else if (loadable.state == "hasError") {
    return <>Une erreur est survenue</>;
  }

  return (
    <Elements
      stripe={loadable.contents.stripe}
      options={{ clientSecret: loadable.contents.clientSecret }}
    >
      {/*<FieldContainer>*/}
      {/*<Label
          textStyle={theme.textTheme.body.small.copyWith({
            color: theme.color.primary["300"],
          })}
        >
          Carte bancaire
        </Label>*/}
      <CardFieldContainer />
      <ErrorMessage
        errors={methods.formState.errors}
        name={name}
        render={({ message }) => (
          <Text
            textStyle={theme.textTheme.body.small.copyWith({
              color: theme.color.error[400],
            })}
          >
            {message}
          </Text>
        )}
      />
      {/*</FieldContainer>*/}
    </Elements>
  );
}

function CardFieldContainer() {
  const stripe = useStripe();
  const elements = useElements();
  const selectMethod = useSetRecoilState(
    StripePaymentNotifier.selectedMethodProvider
  );
  const theme = useTheme();
  const style = {
    base: {
      color: theme.color.primary[400],
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: theme.color.grayscale[300],
      },
    },
    invalid: {
      color: theme.color.error[400],
      iconColor: theme.color.error[400],
    },
  };

  useEffect(() => selectMethod({ stripe: stripe, elements: elements }), [
    stripe,
    elements,
  ]);

  return (
    <CardCustomElement
      options={{
        style: style,
        hidePostalCode: true,
      }}
    />
  );
}

const CardCustomElement = styled(CardElement)`
  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
`;
