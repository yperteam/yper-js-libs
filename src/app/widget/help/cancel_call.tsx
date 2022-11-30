import React, { useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { SvgPicture, Text } from "../../../app/widget/mixins";
import { useNavigate, useParams } from "react-router-dom";
import { Column, Row, Spacing } from "../../widget/generic";
import { ButtonPrimary, TextButton } from "../../widget/button";
import { sideBarProvider } from "../../widget/side_bar";
import { useRecoilCallback, useRecoilState, useSetRecoilState } from "recoil";
import { ButtonLoader } from "../../widget/loader";
import { IconBackground } from "./help_center";
import { CancelPhoneCallNotifier } from "../../notifiers/support/cancel_phone_call_notifier";

const arrowIcon = "/img/ic_arrow_back.svg";
const closeIcon = "/img/react/icon/close_icon.svg";
const alertIcon = "/img/react/icon/ic_alert_circle.svg";

export function CancelCallScreen() {
  const theme = useTheme();
  let { callId } = useParams();
  // TODO this should be history get back
  let setOpened = useSetRecoilState(sideBarProvider);
  let navigate = useNavigate();

  const [state, setState] = useRecoilState(CancelPhoneCallNotifier.provider);
  const notifier = useRecoilCallback(
    callback => async () => {
      return CancelPhoneCallNotifier.notifier(callId, callback);
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

  return (
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
          <Text padding={{ left: "10px" }}>Retour à l'appel</Text>
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
            color={theme.color.error[100]}
            padding={{
              top: "10px",
              bottom: "10px",
              right: "10px",
              left: "10px",
            }}
          >
            <SvgPicture
              src={alertIcon}
              color={theme.color.error[400]}
              height="27px"
              width="27px"
            />
          </IconBackground>
        </Center>
        <Center>
          <Text
            textStyle={theme.textTheme.title.medium}
            padding={{ top: "16px" }}
          >
            Annuler ma demande
          </Text>
        </Center>
        <Center>
          <Text
            textStyle={theme.textTheme.body.medium.copyWith({
              color: theme.color.primary[300],
            })}
            padding={{ top: "16px" }}
          >
            Si vous annulez votre demande, vous allez quitter la file d'attente
            de demande d'appel. Êtes-vous sûr de vouloir continuer ?
          </Text>
        </Center>
      </FormColumn>
      <ButtonSpacing
        padding={{
          left: "16px",
          right: "16px",
          top: "16px",
          bottom: "16px",
        }}
      >
        <Column>
          <ButtonPrimary width="100%" onClick={notifier}>
            {state?.state != "loading" ? (
              <Text textStyle={theme.textTheme.label.medium}>
                Oui, j'annule ma demande
              </Text>
            ) : (
              <ButtonLoader />
            )}
          </ButtonPrimary>
          <TextButton
            width="100%"
            margin={{ top: "16px" }}
            onClick={() => navigate(-1)}
          >
            <Text>Non, je continue de patienter</Text>
          </TextButton>
        </Column>
      </ButtonSpacing>
    </HelpCard>
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
