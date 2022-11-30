import React, { useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { SvgPicture, Text } from "../../../app/widget/mixins";
import { useNavigate, useParams } from "react-router-dom";
import { Column, Row, Spacing } from "../../widget/generic";
import { ButtonPrimary } from "../../widget/button";
import { sideBarProvider } from "../../widget/side_bar";
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { joiResolver } from "@hookform/resolvers/joi";
import { Joi } from "../../../app/widget/helper/extended_joi";
import { RequestPhoneCallNotifier } from "../../notifiers/support/request_phone_call_notifier";
import { FormProvider, useForm } from "react-hook-form";
import { ErrorField, customMessage } from "../error_field";
import { Input } from "../../widget/input";
import { ButtonLoader } from "../../widget/loader";
import { CurrentProNotifier } from "../../notifiers/pro/current_pro_notifier";
import { IconBackground } from "./help_center";

const arrowIcon = "/img/ic_arrow_back.svg";
const closeIcon = "/img/react/icon/close_icon.svg";
const phoneIcon = "/img/react/icon/ic_phone.svg";

export function CallHelpScreen() {
  const theme = useTheme();
  let { reasonId } = useParams();
  let setOpened = useSetRecoilState(sideBarProvider);
  let navigate = useNavigate();
  let pro = useRecoilValueLoadable(CurrentProNotifier.provider);

  const methods = useForm({
    resolver: joiResolver(
      Joi.object({
        phoneNumber: Joi.string().required(),
        comment: Joi.string().optional(),
      }).messages(customMessage()),
      {
        stripUnknown: true,
        abortEarly: false,
      }
    ),
  });

  const [state, setState] = useRecoilState(RequestPhoneCallNotifier.provider);

  const notifier = useRecoilCallback(
    callback => async () => {
      methods.handleSubmit(data => {
        return RequestPhoneCallNotifier.notifier(
          reasonId,
          data.phoneNumber,
          callback,
          data.comment
        );
      })();
    },
    []
  );

  useEffect(() => {
    if (state?.state == "hasValue") {
      // TODO for some reason provider is not freed when not used anymore
      setState(null);
      navigate(-1);
    }
  }, [state]);

  useEffect(() => {
    if (pro?.state == "hasValue") {
      methods.setValue(
        "phoneNumber",
        pro.contents?.companyInfos?.owner?.phone?.number
      );
    }
  }, [pro]);

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
                <SvgPicture src={phoneIcon} height="27px" width="27px" />
              </IconBackground>
            </Center>
            <Center>
              <Text
                textStyle={theme.textTheme.title.medium}
                padding={{ top: "16px" }}
              >
                Remplissez les informations ci-dessous :
              </Text>
            </Center>
            <Text
              textStyle={theme.textTheme.body.medium.copyWith({
                color: theme.color.primary[300],
              })}
              padding={{ top: "16px" }}
            >
              Renseignez le numéro de téléphone sur lequel vous souhaitez être
              contacté :
            </Text>
            <Text
              margin={{ bottom: "2px", top: "16px" }}
              textStyle={theme.textTheme.body.small.copyWith({
                color: theme.color.primary[300],
              })}
            >
              Numéro
            </Text>
            <CustomInput {...methods.register("phoneNumber")} />
            <ErrorField field="phoneNumber" />
            <Text
              textStyle={theme.textTheme.body.medium.copyWith({
                color: theme.color.primary[300],
              })}
              padding={{ top: "16px", bottom: "16px" }}
            >
              Expliquez nous plus en détails votre problématique :
            </Text>
            <CustomInput {...methods.register("comment")} />
            <ErrorField field="comment" />
          </FormColumn>
          <ButtonSpacing
            padding={{
              left: "16px",
              right: "16px",
              top: "16px",
              bottom: "16px",
            }}
          >
            <ButtonPrimary width="100%" onClick={notifier}>
              {state?.state != "loading" ? (
                <Row alignItems="center">
                  <Text margin={{ left: "8px" }}>Valider mes informations</Text>
                </Row>
              ) : (
                <ButtonLoader />
              )}
            </ButtonPrimary>
          </ButtonSpacing>
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

const ButtonSpacing = styled(Spacing)`
  flex: auto;
  border-top: 2px solid
    ${props => props.color ?? props.theme.color.grayscale[200]};
`;

// TODO remove it when we remove app.css
const CustomInput = styled(Input)`
  border: 1px solid #dce3e8 !important;
`;
