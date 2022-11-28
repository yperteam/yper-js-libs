import React, { useEffect } from "react";
import styled, { useTheme } from "styled-components";
import {
  BoldText,
  SvgPicture,
  Text,
} from "@yper-script/react/app/widget/mixins";
import { useLocation, useNavigate } from "react-router-dom";
import { Column, Row, Spacing } from "../../widget/generic";
import { ButtonOutlined, ButtonPrimary } from "../../widget/button";
import { sideBarProvider } from "../../widget/app_bar";
import { useRecoilCallback, useRecoilState, useSetRecoilState } from "recoil";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "@yper-script/react/app/widget/helper/extended_joi";
import { FormProvider, useForm } from "react-hook-form";
import ErrorField, { customMessage } from "../order/error_field";
import { Input } from "../../widget/input";
import { ButtonLoader } from "../../widget/loader";
import { IconBackground } from "./help_center";
import { PasswordLoginNotifier } from "../../notifiers/auth/password_login_notifier";

const arrowIcon = "/img/ic_arrow_back.svg";
const closeIcon = "/img/react/icon/close_icon.svg";
const lockIcon = "/img/react/icon/ic_lock.svg";
const callIcon = "/img/react/icon/ic_help_call.svg";
const paperIcon = "/img/react/icon/ic_help_paper.svg";

export default function LoginHelpScreen() {
  const theme = useTheme();
  // TODO this should be history get back
  let setOpened = useSetRecoilState(sideBarProvider);
  let navigate = useNavigate();

  const methods = useForm({
    resolver: joiResolver(
      Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
      }).messages(customMessage()),
      {
        stripUnknown: true,
        abortEarly: false,
      }
    ),
  });

  const [state, setState] = useRecoilState(PasswordLoginNotifier.provider);
  const location = useLocation();
  const notifier = useRecoilCallback(
    callback => async () => {
      methods.handleSubmit(data => {
        return PasswordLoginNotifier.notifier(
          data.username,
          data.password,
          callback
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
      if (state.contents.errorCode == "invalid_credentials") {
        methods.setError("username", { message: "Identifiants invalides" });
      }
      console.log(state.contents);
    }
  }, [state]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={event => {
          event.preventDefault();
        }}
      >
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
              <Text padding={{ left: "10px" }}>Retour à l'aide</Text>
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
              <IconBackground
                padding={{
                  top: "10px",
                  bottom: "10px",
                  right: "10px",
                  left: "10px",
                }}
              >
                <SvgPicture
                  src={lockIcon}
                  height="27px"
                  width="27px"
                  color={theme.color.primary[400]}
                />
              </IconBackground>
            </Center>
            <Center>
              <Text
                textStyle={theme.textTheme.title.medium.copyWith({
                  color: theme.color.primary[500],
                })}
                padding={{ top: "16px" }}
              >
                Connectez-vous pour bénéficier de l'option "être appelé par
                Yper"
              </Text>
            </Center>
            <Text
              margin={{ bottom: "2px", top: "16px" }}
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
            <Spacing padding={{ top: "16px" }}>
              <ButtonPrimary width="100%" onClick={notifier}>
                {state?.state != "loading" ? (
                  <Row alignItems="center">
                    <Text margin={{ left: "8px" }}>Me connecter</Text>
                  </Row>
                ) : (
                  <ButtonLoader />
                )}
              </ButtonPrimary>
            </Spacing>
          </FormColumn>
          <RegisterColumn
            padding={{
              left: "16px",
              right: "16px",
              top: "16px",
              bottom: "16px",
            }}
          >
            <Row alignItems="center" justifyContent="start">
              <Text
                textStyle={theme.textTheme.title.medium.copyWith({
                  color: theme.color.secondary[400],
                })}
                padding={{ right: "8px" }}
              >
                {">"}
              </Text>
              <Text textStyle={theme.textTheme.title.medium}>
                Nouveau ? Créez votre compte !
              </Text>
            </Row>
            <Text
              textStyle={theme.textTheme.body.medium}
              padding={{ top: "24px", bottom: "24px" }}
            >
              <span>Besoin d'être convaincu ? Voici de </span>
              <BoldText>bonnes raisons</BoldText>
              <span> de vous inscrire chez Yper :</span>
            </Text>
            <Row alignItems="center">
              <SvgPicture
                padding={{ left: "3px" }}
                src={paperIcon}
                height="24px"
                width="24px"
              />
              <Text padding={{ left: "8px" }}>
                Réservez vos livraisons rapidement en enregistrant vos
                informations
              </Text>
            </Row>
            <Row padding={{ top: "24px", bottom: "24px" }} alignItems="center">
              <SvgPicture src={callIcon} height="24px" width="24px" />
              <Text padding={{ left: "8px" }}>
                Profitez de l'option "appel par Yper" dans le centre d'aide
              </Text>
            </Row>
            <ButtonOutlined width="100%" onClick={() => navigate("/register", { state: { path: location.pathname } })}>
              <Text>Créer mon compte</Text>
            </ButtonOutlined>
          </RegisterColumn>
        </HelpCard>
      </form>
    </FormProvider >
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

const RegisterColumn = styled(Column)`
  flex: auto;
  border-top: 2px solid
    ${props => props.color ?? props.theme.color.grayscale[200]};
`;

// TODO remove it when we remove app.css
const CustomInput = styled(Input)`
  border: 1px solid #dce3e8 !important;
`;
