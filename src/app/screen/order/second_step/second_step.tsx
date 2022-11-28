import React, { useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { SvgPicture, Text } from "@yper-script/react/app/widget/mixins";
import { Column, Flexible, Row } from "@yper-script/react/app/widget/generic";
import { useRecoilValue, useRecoilState } from "recoil";
import { ButtonOutlined } from "@yper-script/react/app/widget/button";
import { StepNotifier } from "@yper-script/react/app/notifiers/order/step_notifier";
import StepForm, {
  editProvider,
} from "@yper-script/react/app/screen/order/second_step/step_form";
import { OrderContentNotifier } from "@yper-script/react/app/notifiers/order/order_content_notifier";
import { PrebookNotifier } from "@yper-script/react/app/notifiers/order/prebook_notifier";
import { capitalizeText } from "@yper-script/react/app/widget/helper/capitalize_text";
import { useTranslation } from "react-i18next";

/** Images */
const DeliveryContentIcon = "/img/react/order/delivery_content_icon.svg";
const CheckStepIcon = "/img/react/order/check_step_icon.svg";
const EditIcon = "/img/react/order/edit_icon.svg";

function SecondStep(props: { orderId: string; prebookId: string }) {
  const theme = useTheme();

  /** Recoil */
  const showStep = useRecoilValue(StepNotifier.provider(props.prebookId));
  const state = useRecoilValue(OrderContentNotifier.provider(props.orderId));
  const [editForm, setEditForm] = useRecoilState(editProvider);

  useEffect(() => {
    if (state?.state === "hasError") {
    } else if (state?.state == "hasValue") {
      setEditForm(false);
    }
  }, [state]);

  return (
    <>
      <Card>
        <CardTitle justifyContent={"start"} alignItems={"center"}>
          <SvgPicture
            src={
              showStep > 1 && !editForm ? CheckStepIcon : DeliveryContentIcon
            }
            width="40px"
            height="40px"
          />
          <Text
            margin={{ left: "12px" }}
            textStyle={theme.textTheme.title.medium.copyWith({
              color: theme.color.primary["500"],
            })}
          >
            Contenu de la livraison
          </Text>
          {showStep > 1 && !editForm && (
            <Flexible justifyContent={"flex-end"}>
              <ButtonOutlined onClick={() => setEditForm(true)}>
                <SvgPicture src={EditIcon} width="16px" height="16px" />
                <Text
                  margin={{ left: "10px" }}
                  textStyle={theme.textTheme.label.medium}
                >
                  Modifier
                </Text>
              </ButtonOutlined>
            </Flexible>
          )}
        </CardTitle>
        {(showStep == 1 || editForm) && (
          <StepForm orderId={props.orderId} prebookId={props.prebookId} />
        )}
        {showStep > 1 && !editForm && (
          <StepSummary orderId={props.orderId} prebookId={props.prebookId} />
        )}
      </Card>
    </>
  );
}

function StepSummary(props: { orderId: string; prebookId: string }) {
  const theme = useTheme();
  const { t } = useTranslation([], {
    keyPrefix: "options",
  });

  /** Recoil */
  const prebookLoadable = useRecoilValue(
    PrebookNotifier.provider(props.prebookId)
  );
  const template = useRecoilValue(
    PrebookNotifier.templateProvider(props.prebookId)
  );

  if (prebookLoadable.state === "loading") {
    return <div>loading</div>;
  }
  if (prebookLoadable.state === "hasError") {
    return <div>Dommage</div>;
  }

  const prebook = prebookLoadable.contents;

  return (
    <Row
      padding={{ top: "12px", bottom: "12px", right: "24px", left: "24px" }}
      justifyContent={"space-around"}
      alignItems={"start"}
    >
      <Column width={"40%"}>
        <Text
          textStyle={theme.textTheme.body.medium.copyWith({
            color: theme.color.primary["300"],
          })}
        >
          Détails de la commande
        </Text>
        <Row justifyContent={"flex-start"} wrap={"wrap"} width="100%">
          <Row width="auto" margin={{ right: "16px" }} alignItems="center">
            <SvgPicture
              src={`/img/react/order/product_${template.name}.svg`}
              height="17px"
              width="17px"
            >
              <SvgPicture
                src={`/img/react/order/product_other.svg`}
                width="17px"
                height="17px"
              />
            </SvgPicture>
            <Text margin={{ left: "6px" }}>
              {template.description ?? template.name}
            </Text>
          </Row>
          {prebook?.options.map(option => (
            <Row
              key={option}
              width="auto"
              margin={{ right: "16px" }}
              alignItems="center"
            >
              <SvgPicture
                src={`/img/react/order/option_${option}.svg`}
                height="17px"
                width="17px"
              />
              <Text margin={{ left: "6px" }}>{capitalizeText(t(option))}</Text>
            </Row>
          ))}
        </Row>
      </Column>
      <Column width={"15%"}>
        <Text
          textStyle={theme.textTheme.body.medium.copyWith({
            color: theme.color.primary["300"],
          })}
        >
          Nombre d'articles
        </Text>
        <Text>{prebook?.extra.nbItems}</Text>
      </Column>
      <Column width={"25%"}>
        <Text
          textStyle={theme.textTheme.body.medium.copyWith({
            color: theme.color.primary["300"],
          })}
        >
          Valeur marchande
        </Text>
        <Text>{prebook?.extra.price} €</Text>
      </Column>
    </Row>
  );
}

export default SecondStep;

/** Styled Component */
const Card = styled(Column)`
  margin-top: 19px;
  background-color: ${props => props.theme.color.grayscale["000"]};
  box-shadow: 0 2px 20px rgba(54, 80, 108, 0.1);
  border-radius: 10px;
`;

const CardTitle = styled(Row)`
  border-bottom: 1px solid ${props => props.theme.color.grayscale["200"]};
  padding: 12px 24px;
`;
