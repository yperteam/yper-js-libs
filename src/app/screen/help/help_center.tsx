import React, { useState } from "react";
import styled, { DefaultTheme, useTheme } from "styled-components";
import { SvgPicture, Text } from "@yper-script/react/app/widget/mixins";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { CardAction } from "../../widget/card";
import { Column, Row, Spacing } from "../../widget/generic";
import { ButtonOutlined, ButtonPrimary, TextButton } from "../../widget/button";
import { ProContactReasonsNotifier } from "../../notifiers/support/pro_contact_reasons_notifier";
import {
  FaqArticle,
  MeanType,
} from "@yper-script/react/data/entity/contact_reason.entity";
import CustomLoader from "@yper-script/react/app/widget/loader";
import { sideBarProvider } from "../../widget/app_bar";
import { PhoneCallRequestNotifier } from "../../notifiers/support/phone_call_request_notifier";
import { ClipLoader } from "react-spinners";
import Select from "react-select";
import { LoggedNotifier } from "../../notifiers/auth/logged_notifier";
import { ContactReason } from "@yper-script/react/domain/usecase/support/get_pro_contact_reasons";

const closeIcon = "/img/react/icon/close_icon.svg";
const questionIcon = "/img/react/icon/ic_question_circle.svg";
const questionMessageIcon = "/img/react/icon/ic_question_help_message.svg";
const mailIcon = "/img/react/icon/ic_mail.svg";
const phoneIcon = "/img/react/icon/ic_phone.svg";

export default function HelpCenter() {
  const theme = useTheme();
  let state = useRecoilValue(ProContactReasonsNotifier.provider);
  let byCategoryState = useRecoilValue(
    ProContactReasonsNotifier.byCategoryProvider
  );
  let [selectedCategory, setCategory] = useState<string>(null);
  let [selectedReason, setReason] = useState<ContactReason>(null);
  let setOpened = useSetRecoilState(sideBarProvider);
  const phoneCallState = useRecoilValue(PhoneCallRequestNotifier.provider);

  if (phoneCallState.state == "loading" || state.state == "loading")
    return (
      <HelpCard justifyContent="start">
        <CustomLoader />
      </HelpCard>
    );

  if (phoneCallState.contents?.length > 0) {
    return <WaitingCallScreen callId={phoneCallState.contents[0].id} />;
  }

  return (
    <HelpCard justifyContent="start">
      <CategoryColumn
        alignItems="center"
        padding={{ left: "16px", right: "16px", bottom: "16px", top: "12px" }}
      >
        <Row justifyContent="end" padding={{ right: "12px" }}>
          <CardAction onClick={() => setOpened(false)}>
            <SvgPicture src={closeIcon} />
          </CardAction>
        </Row>
        <IconBackground
          padding={{ top: "10px", bottom: "10px", right: "10px", left: "10px" }}
        >
          <SvgPicture src={questionIcon} height="27px" width="27px" />
        </IconBackground>
        <Text padding={{ top: "8px" }} textStyle={theme.textTheme.title.medium}>
          Centre d'aide
        </Text>
        <TypeaheadContainer>
          <Text
            margin={{ bottom: "2px" }}
            textStyle={theme.textTheme.body.small.copyWith({
              color: theme.color.primary[300],
            })}
          >
            Catégorie
          </Text>
          <Select
            components={{ IndicatorSeparator: () => null }}
            isSearchable={false}
            isMulti={false}
            maxMenuHeight={380}
            noOptionsMessage={() => <Text>Aucunes options</Text>}
            placeholder={<Text>Sélectionnez une catégorie</Text>}
            onChange={selectedOption => {
              setCategory(selectedOption?.value);
              setReason(null);
            }}
            options={byCategoryState.map(v => {
              return { value: v.categoryName, label: v.categoryLabel };
            })}
          />
        </TypeaheadContainer>
        {selectedCategory && (
          <TypeaheadContainer>
            <Text
              margin={{ bottom: "2px" }}
              textStyle={theme.textTheme.body.small.copyWith({
                color: theme.color.primary[300],
              })}
            >
              Motif
            </Text>
            <Select
              value={selectedReason}
              components={{ IndicatorSeparator: () => null }}
              isSearchable={false}
              isMulti={false}
              maxMenuHeight={300}
              placeholder={<Text>Sélectionnez un motif</Text>}
              getOptionLabel={o => (o as ContactReason).label}
              onChange={setReason}
              isOptionSelected={o =>
                (o as ContactReason).id === selectedReason?.id
              }
              options={state.contents?.filter(
                r => r.categoryName == selectedCategory
              )}
            />
          </TypeaheadContainer>
        )}
      </CategoryColumn>
      {selectedReason && (
        <SolutionsColumn
          justifyContent="start"
          height="100%"
          padding={{
            left: "16px",
            right: "16px",
            top: "16px",
            bottom: "16px",
          }}
        >
          <Text textStyle={theme.textTheme.title.medium}>
            Ceci pourrait vous aider :
          </Text>
          {selectedReason &&
            selectedReason.faq.map(a => (
              <ArticlePost key={a.title} theme={theme} article={a} />
            ))}
        </SolutionsColumn>
      )}
      {selectedReason && selectedReason.meansOfContact.length > 0 && (
        <MoreSpacing
          padding={{
            left: "16px",
            right: "16px",
            top: "16px",
            bottom: "16px",
          }}
        >
          <Text
            padding={{ bottom: "16px" }}
            textStyle={theme.textTheme.title.medium}
          >
            Je ne trouve pas de solution
          </Text>
          {selectedReason.meansOfContact.find(c => c.type == MeanType.chat) && (
            <ButtonPrimary
              width="100%"
              margin={{ bottom: "16px" }}
              onClick={() => {
                const url =
                  "https://static.zdassets.com/web_widget/latest/liveChat.html?v=10#key=yperhelp.zendesk.com";
                window.open(url, "_blank");
              }}
            >
              <Row alignItems="center">
                <SvgPicture src={questionMessageIcon} color="white" />
                <Text margin={{ left: "8px" }}>Ouvrir le chat</Text>
              </Row>
            </ButtonPrimary>
          )}
          {selectedReason.meansOfContact.find(
            c => c.type == MeanType.email
          ) && (
            <ButtonOutlined
              width="100%"
              margin={{ bottom: "16px" }}
              onClick={() => {
                const mail = selectedReason.meansOfContact.find(
                  c => c.type == MeanType.email
                ).settings.email;
                window.open(`mailto:${mail}`, "_blank");
              }}
            >
              <Row alignItems="center">
                <SvgPicture src={mailIcon} />
                <Text margin={{ left: "8px" }}>Envoyer un email</Text>
              </Row>
            </ButtonOutlined>
          )}
          {selectedReason.meansOfContact.find(
            c => c.type == MeanType.phone
          ) && <CallRequestButton reasonId={selectedReason.id} />}
        </MoreSpacing>
      )}
    </HelpCard>
  );
}

function CallRequestButton(props: { reasonId: string }) {
  let navigate = useNavigate();
  let isLoggedIn = useRecoilValue(LoggedNotifier.provider);

  return (
    <TextButton
      width="100%"
      onClick={() => navigate(`/help/call/${props.reasonId}`)}
    >
      <Row alignItems="center">
        <SvgPicture src={phoneIcon} />
        <Text margin={{ left: "8px" }}>Me faire appeler par Yper</Text>
      </Row>
    </TextButton>
  );
}

function ArticlePost(props: { theme: DefaultTheme; article: FaqArticle }) {
  return (
    <Row padding={{ top: "24px" }} justifyContent="start">
      <Text
        textStyle={props.theme.textTheme.title.small}
        padding={{ right: "8px" }}
      >
        •
      </Text>
      <a href={props.article.url} target="_blank">
        <ArticleLinkText textStyle={props.theme.textTheme.title.small}>
          {props.article.title}
        </ArticleLinkText>
      </a>
    </Row>
  );
}

function WaitingCallScreen(props: { callId: string }) {
  const theme = useTheme();
  let navigate = useNavigate();

  return (
    <HelpCard justifyContent="start" alignItems="center">
      <Column size="2" alignItems="center">
        <ClipLoader color={theme.color.primary[400]} size={54} />
        <Text
          padding={{ top: "24px" }}
          textStyle={theme.textTheme.title.medium}
        >
          Demande en cours
        </Text>
        <Text padding={{ top: "8px", bottom: "16px" }}>
          Merci de patienter, un conseiller va vous appeler.
        </Text>
      </Column>
      <Column size="1" alignItems="center">
        <ButtonPrimary onClick={() => navigate(`/help/cancel/${props.callId}`)}>
          <Text textStyle={theme.textTheme.label.medium}>
            Annuler ma demande d'appel
          </Text>
        </ButtonPrimary>
      </Column>
    </HelpCard>
  );
}

const TypeaheadContainer = styled.div`
  margin-top: 16px;
  width: 100%;
`;

const HelpCard = styled(Column)`
  height: calc(100vh - 90px);
  flex-flow: column nowrap;
`;

const MoreSpacing = styled(Spacing)`
  border-top: 2px solid ${props => props.theme.color.grayscale[200]};
`;

const SolutionsColumn = styled(Column)`
  overflow-y: scroll;
  flex: auto;
`;

const CategoryColumn = styled(Column)`
  border-bottom: 2px solid ${props => props.theme.color.grayscale[200]};
`;

export const IconBackground = styled(Spacing)`
  background: ${props => props.color ?? props.theme.color.primary[100]};
  border-radius: 24px;
`;

const ArticleLinkText = styled(Text)`
  text-decoration: underline !important;

  :hover {
    color: ${props => props.theme.color.primary[300]};
    transition: all 0.2s ease-in-out;
  }
`;
