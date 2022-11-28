import React, { useEffect } from "react";
import styled, { css, useTheme } from "styled-components";
import NumberFormat from "react-number-format";
import { SvgPicture, Text } from "@yper-script/react/app/widget/mixins";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Column, Row, Spacing } from "../../widget/generic";
import { ButtonPrimary } from "../../widget/button";
import { sideBarProvider } from "../../widget/app_bar";
import {
  useRecoilCallback,
  useRecoilState,
  useSetRecoilState,
} from "recoil";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "@yper-script/react/app/widget/helper/extended_joi";
import { Controller, FormProvider, useForm } from "react-hook-form";
import ErrorField, { customMessage } from "../order/error_field";
import { Input } from "../../widget/input";
import { ButtonLoader } from "../../widget/loader";
import { UserSex } from "@yper-script/react/data/entity/user.entity";
import { RegisterUserNotifier } from "../../notifiers/user/register_user_notifier";

const arrowIcon = "/img/ic_arrow_back.svg";
const closeIcon = "/img/react/icon/close_icon.svg";
const infoIcon = "/img/react/icon/ic_information_circle_full.svg";

export default function RegisterHelpScreen() {
  const theme = useTheme();
  let setOpened = useSetRecoilState(sideBarProvider);
  let navigate = useNavigate();
  const cutoffDate = new Date(new Date().valueOf() - (1000 * 60 * 60 * 24 * 365 * 18));
  const location = useLocation();
  const methods = useForm({
    reValidateMode: "onSubmit",
    resolver: joiResolver(
      Joi.object({
        sex: Joi.string().required(),
        username: Joi.string().email({ tlds: { allow: false } }).required(),
        firstname: Joi.string().min(3).required(),
        lastname: Joi.string().min(3).required(),
        phoneNumber: Joi.phoneNumber()
          .defaultRegion("FR")
          .required(),
        password: Joi.string()
          .pattern(new RegExp('(?=.*?[a-z]).*$'))
          .pattern(new RegExp('(?=.*[A-Z]).*$'))
          .pattern(new RegExp('(?=.*?[0-9]).*$'))
          .pattern(new RegExp("(?=.*[!\"#\$%&'\(\)\*\+,-\.\/:;<=>\?@\[\\\]\^_`\{\|\}~£€]).*$"))
          .min(8)
          .required(),
        confirmPassword: Joi.any().valid(Joi.ref('password')).required()
          .options({ messages: { 'any.only': 'Mot de passe non identique' } }),
        gdpr: Joi.boolean().invalid(false),
        cgu: Joi.boolean().invalid(false),
        birthdate: Joi.date().format('DD/MM/YYYY').utc().empty(["", null]).max(cutoffDate).required()
          .options({ messages: { 'date.max': 'Vous devez être majeur pour vous inscrire' } }),
      }).messages(customMessage()),
      {
        stripUnknown: true,
        abortEarly: false,
      },
    ),
    defaultValues: {
      sex: null,
      username: null,
      firstname: null,
      lastname: null,
      phoneNumber: null,
      password: null,
      confirmPassword: null,
      gdpr: false,
      cgu: false,
      birthdate: null,
    }
  });

  const [state, setState] = useRecoilState(RegisterUserNotifier.provider);

  const notifier = useRecoilCallback(
    callback => async () => {
      methods.handleSubmit(data => {
        return RegisterUserNotifier.notifier(
          {
            email: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            phone: data.phoneNumber,
            sex: data.sex,
            birthDate: data.birthdate,
            password: data.password
          },
          callback,
        );
      })();
    },
    []
  );

  useEffect(() => {
    if (state?.state == "hasValue") {
      // TODO for some reason provider is not freed when not used anymore
      setState(null);
      navigate(location.state?.path || -1);
    } else if (state?.state == "hasError") {
      switch (state.contents?.error_code) {
        case "phone_already_exists":
          methods.setError("phoneNumber", { message: "Ce numéro est associé à un compte yper existant" });
          break;
        case "invalid_phone":
          methods.setError("phoneNumber", { message: "Ce numéro n'est pas valide" });
          break;
        case "invalid_mail":
          methods.setError("username", { message: "Cette adresse email est invalide" });
          break;
        default:
          break;
      }
    }
  }, [state]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={event => {
        event.preventDefault();
      }}>
        <HelpCard justifyContent="start">
          <HeaderRow
            alignItems="center"
            justifyContent="start"
            padding={{
              left: "16px",
              right: "16px",
              bottom: "16px",
              top: "12px",
            }}
          >
            <ActionRow onClick={() => navigate(-1)}>
              <SvgPicture src={arrowIcon} height="11px" width="12px" />
              <Text padding={{ left: "10px" }}>Retour</Text>
            </ActionRow>
            <Spacer />
            <ActionRow onClick={() => setOpened(false)}>
              <SvgPicture src={closeIcon} />
            </ActionRow>
          </HeaderRow>
          <FormColumn
            justifyContent="start"
            padding={{
              left: "16px",
              right: "16px",
              bottom: "24px",
              top: "24px",
            }}
          >
            <Center>
              <Text textStyle={theme.textTheme.title.medium}>
                Créez votre compte Yper
              </Text>
            </Center>
            <InfoRow margin={{ top: "16px" }} padding={{ left: "16px", right: "16px", top: "16px", bottom: "16px" }}>
              <SvgPicture src={infoIcon} color={theme.color.information[400]} />
              <Text padding={{ left: "18px" }} textStyle={theme.textTheme.title.small}>
                Tous les champs du formulaire sont obligatoires
              </Text>
            </InfoRow>
            <Text
              margin={{ bottom: "2px", top: "16px" }}
              textStyle={theme.textTheme.body.small.copyWith({
                color: theme.color.primary[300],
              })}
            >
              Civilité
            </Text>
            <Controller control={methods.control} name="sex" render={({ field: { onChange, value } }) =>
              <Row wrap="wrap" justifyContent="start">
                {[{ value: UserSex.male, label: "Monsieur" },
                { value: UserSex.female, label: "Madame" },
                { value: UserSex.unknown, label: "Je ne souhaite pas préciser" }
                ].map((d) => <Spacing padding={{ right: "12px", bottom: "8px" }}>
                  <CheckboxMethod
                    key={"sex-input-" + d.label}
                    alignItems={"center"}
                    justifyContent={"start"}
                    onClick={() => onChange(d.value)}
                    selected={value == d.value}
                  >
                    <CheckboxInput
                      type="checkbox"
                      checked={value == d.value}
                      readOnly={true}
                    />
                    <Text
                      textStyle={theme.textTheme.label.medium}
                      margin={{ left: "6px" }}
                    >
                      {d.label}
                    </Text>
                  </CheckboxMethod>
                </Spacing>)}
              </Row>} />
            <ErrorField field="sex" />
            <Text
              margin={{ bottom: "2px", top: "16px" }}
              textStyle={theme.textTheme.body.small.copyWith({
                color: theme.color.primary[300],
              })}
            >
              Prénom
            </Text>
            <CustomInput {...methods.register("firstname")} />
            <ErrorField field="firstname" />
            <Text
              margin={{ bottom: "2px", top: "16px" }}
              textStyle={theme.textTheme.body.small.copyWith({
                color: theme.color.primary[300],
              })}
            >
              Nom
            </Text>
            <CustomInput {...methods.register("lastname")} />
            <ErrorField field="lastname" />
            <Text
              margin={{ bottom: "2px", top: "16px" }}
              textStyle={theme.textTheme.body.small.copyWith({
                color: theme.color.primary[300],
              })}
            >
              Date de naissance
            </Text>
            <Controller
              control={methods.control}
              name="birthdate"
              render={({ field: { onChange, value, name } }) => (
                <NumberFormat
                  format="##/##/####"
                  placeholder="jj/mm/aaaa"
                  name={name}
                  mask={['j', 'j', 'm', 'm', 'a', 'a', 'a', 'a']}
                  value={value}
                  onChange={onChange}
                  customInput={CustomInput}
                />
              )} />
            <ErrorField field="birthdate" />
            <Text
              margin={{ bottom: "2px", top: "16px" }}
              textStyle={theme.textTheme.body.small.copyWith({
                color: theme.color.primary[300],
              })}
            >
              Numéro de téléphone
            </Text>
            <CustomInput {...methods.register("phoneNumber")} />
            <ErrorField field="phoneNumber" />
            <Text
              margin={{ bottom: "2px", top: "8px" }}
              textStyle={theme.textTheme.body.small.copyWith({
                color: theme.color.primary[300],
              })}
            >
              Adresse email
            </Text>
            <CustomInput {...methods.register("username")} />
            <ErrorField field="username" />
            <Text
              margin={{ bottom: "2px", top: "16px" }}
              textStyle={theme.textTheme.body.small.copyWith({
                color: theme.color.primary[300],
              })}
            >
              Mot de passe
            </Text>
            <CustomInput type="password" {...methods.register("password")} />
            <ErrorField field="password" />
            <Text textStyle={theme.textTheme.label.medium} padding={{ top: "16px", bottom: "4px" }}>
              Le mot de passe doit contenir au minimum
            </Text>
            <Row padding={{ left: "8px", right: "8px" }}>
              <Column size={1}>
                <Text>
                  • 8 caractères
                </Text>
                <Text>
                  • 1 minuscule
                </Text>
                <Text>
                  • 1 majuscule
                </Text>
              </Column>
              <Column size={1}>
                <Text>
                  • 1 caractère spécial<br />(ex : !?/$€%#)
                </Text>
                <Text>
                  • 1 chiffre
                </Text>
              </Column>
            </Row>
            <Text
              margin={{ bottom: "2px", top: "16px" }}
              textStyle={theme.textTheme.body.small.copyWith({
                color: theme.color.primary[300],
              })}
            >
              Confirmer le mot de passe
            </Text>
            <CustomInput type="password" {...methods.register("confirmPassword")} />
            <ErrorField field="confirmPassword" />
            <Controller name="cgu" render={({ field: { onChange, value } }) =>
              <Row padding={{ top: "16px" }} onClick={() => onChange(!value)}>
                <CheckboxInput type="checkbox" checked={value} readOnly={true} />
                <Text textStyle={theme.textTheme.body.small} margin={{ left: "2px" }}>
                  Je déclare avoir pris connaissance des Conditions Générales d'Utilisation de Yper et les accepter.
                </Text>
              </Row>} />
            <ErrorField field="cgu" />
            <Controller name="gdpr" render={({ field: { onChange, value } }) =>
              <Row padding={{ top: "16px" }} onClick={() => onChange(!value)}>
                <CheckboxInput type="checkbox" readOnly={true} checked={value} />
                <Text textStyle={theme.textTheme.body.small} margin={{ left: "2px" }} >
                  Je déclare avoir pris connaissance de la Politique de Gestion des Données Personnelles et l'accepter.
                </Text>
              </Row>} />
            <ErrorField field="gdpr" />
            <Spacing padding={{ top: "16px" }} >
              <ButtonPrimary width="100%" onClick={notifier}>
                {state?.state != "loading" ? (
                  <Row alignItems="center">
                    <Text margin={{ left: "8px" }}>Confirmer</Text>
                  </Row>
                ) : (
                  <ButtonLoader />
                )}
              </ButtonPrimary>
            </Spacing>
          </FormColumn>
        </HelpCard>
      </form>
    </FormProvider>
  );
}

const HelpCard = styled(Column)`
  height: calc(100vh - 90px);
  flex-flow: column nowrap;
`;

const FormColumn = styled(Column)`
  overflow-y: scroll;
`;

const HeaderRow = styled(Row)`
  border-bottom: 2px solid
    ${props => props.color ?? props.theme.color.grayscale[200]};
`;

const ActionRow = styled.div`
  cursor: pointer;
  flex: none;
  flex-direction: row;
  align-items: center;
  display: flex;
`;

const Spacer = styled.div`
  flex: 1;
`;

const Center = styled.div`
  align-self: center;
`;

// TODO remove it when we remove app.css
const CustomInput = styled(Input)`
  border: 1px solid #dce3e8 !important;
`;

const CheckboxMethod = styled(Row) <any>`
  cursor: pointer;
  border: 1px solid #c0d0e2;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 10px 13px;
  width: fit-content;

  ${props =>
    props.selected &&
    css`
      background-color: ${props => props.theme.color.secondary["100"]};
      border-color: ${props => props.theme.color.secondary["400"]};
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
    box-shadow: inset 0 0 0 4px ${props => props.theme.color.secondary["400"]};
    transition: 0.5s;
    padding: 3px;
  }
`;

const InfoRow = styled(Row)`
  border: 1px solid ${props => props.theme.color.information["400"]};
  background: ${props => props.theme.color.information["100"]};
`