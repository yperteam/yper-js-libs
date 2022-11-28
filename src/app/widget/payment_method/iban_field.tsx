import React, { useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { Column } from "@yper-script/react/app/widget/generic";
import { Label, Text } from "@yper-script/react/app/widget/mixins";
import CustomLoader from "@yper-script/react/app/widget/loader";
import { useFormContext } from "react-hook-form";
import {
  Elements,
  IbanElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { ErrorMessage } from "@hookform/error-message";
import Joi from "joi";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { StripePaymentNotifier } from "../../notifiers/stripe_payment_notifier";

export const ibanSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      "any.required": `Ce champ est obligatoire`,
      "string.base": `Ce champ est obligatoire`,
      "string.empty": `Ce champ est obligatoire`,
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "any.required": `Ce champ est obligatoire`,
      "string.base": `Ce champ est obligatoire`,
      "string.empty": `Ce champ est obligatoire`,
      "string.email": `Cette adresse n'est pas valide`,
    }),
});

export function IbanField() {
  const loadable = useRecoilValueLoadable(StripePaymentNotifier.ibanProvider);
  const theme = useTheme();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useFormContext();

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
      <form onSubmit={handleSubmit(_ => {})}>
        <Label
          textStyle={theme.textTheme.body.small.copyWith({
            color: theme.color.primary["300"],
          })}
        >
          IBAN
        </Label>
        <IbanFieldContainer />
        <ErrorMessage
          errors={errors}
          name="iban"
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
        <Column margin={{ top: "1rem" }}>
          <Label
            textStyle={theme.textTheme.body.small.copyWith({
              color: theme.color.primary["300"],
            })}
          >
            Nom attaché à ce compte bancaire
          </Label>
          <Input {...register("name", { required: true })} />
          <ErrorMessage
            errors={errors}
            name="name"
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
        </Column>
        <Column margin={{ top: "1rem" }}>
          <Label
            textStyle={theme.textTheme.body.small.copyWith({
              color: theme.color.primary["300"],
            })}
          >
            Votre adresse email
          </Label>
          <Input {...register("email", { required: true })} />
          <ErrorMessage
            errors={errors}
            name="email"
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
        </Column>
        <Text margin={{ top: "1rem" }} textStyle={theme.textTheme.body.small}>
          En fournissant votre IBAN, vous autorisez Yper SAS, Rocketship Inc. et
          Stripe, notre fournisseur de services de paiement, à envoyer des
          instructions à votre banque pour qu'elle débite votre compte et à
          votre banque pour débiter votre compte conformément à ces
          instructions. Vous avez droit à un remboursement de votre banque selon
          les termes et conditions de votre contrat avec votre banque. Un
          remboursement doit être demandé dans les 8 semaines à compter de la
          date à laquelle votre compte a été débité.
        </Text>
      </form>
    </Elements>
  );
}

function IbanFieldContainer() {
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
    <IbanCustomElement
      options={{
        style: style,
        supportedCountries: ["SEPA"],
        placeholderCountry: "FR",
      }}
    />
  );
}

const IbanCustomElement = styled(IbanElement)`
  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
`;

const FieldContainer = styled(Column)`
  background-color: #f4f7f9;
  padding: 0.5rem;
  margin-top: 1rem;
  margin-left: 1rem;
`;

const Input = styled.input`
  border-radius: 2px;
  min-height: 40px;
  padding: 10px 12px 10px 8px;

  &:focus-visible {
    outline: 1px solid ${props => props.theme.color.information["400"]};
  }
`;
