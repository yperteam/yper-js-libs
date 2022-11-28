import React from "react";
import styled, { useTheme } from "styled-components";
import FirstStep from "@yper-script/react/app/screen/order/first_step/first_step";
import SecondStep from "@yper-script/react/app/screen/order/second_step/second_step";
import ThirdStep from "@yper-script/react/app/screen/order/third_step/third_step";
import { Column, Flexible, Row } from "@yper-script/react/app/widget/generic";
import OrderSummary from "@yper-script/react/app/screen/order/order_summary";
import CustomLoader from "@yper-script/react/app/widget/loader";
import { SvgPicture, Text } from "@yper-script/react/app/widget/mixins";
import { ButtonOutlined } from "@yper-script/react/app/widget/button";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { MissionTemplateNotifier } from "../../notifiers/order/mission_template_notifier";
import { PrebookNotifier } from "../../notifiers/order/prebook_notifier";
import { ProRetailpointsNotifier } from "../../notifiers/retailpoint/pro_retailpoints_notifier";

/** Images */
const ButtonMultiDelivery = "/img/react/order/ic_list-add.svg";

function OrderScreen() {
  const theme = useTheme();

  /** Values */
  const orderId = window.location.pathname.split("/")[2];
  const prebookId = window.location.pathname.split("/")[3];
  const missionTemplateLoadable = useRecoilValueLoadable(
    MissionTemplateNotifier.provider
  );
  const rpLoadable = useRecoilValueLoadable(ProRetailpointsNotifier.provider);
  const prebookLoadable = useRecoilValue(PrebookNotifier.provider(prebookId));

  if (
    missionTemplateLoadable.state == "loading" ||
    prebookLoadable.state == "loading" ||
    rpLoadable.state == "loading"
  ) {
    return <CustomLoader />;
  } else if (
    missionTemplateLoadable.state == "hasError" ||
    prebookLoadable.state == "hasError" ||
    rpLoadable.state == "hasError"
  ) {
    return <></>;
  }

  return (
    <Container>
      <Row justifyContent={"start"} alignItems={"center"}>
        <Flexible size={1} justifyContent={"start"}>
          <Arrow> {">"} </Arrow>
          <Text textStyle={theme.textTheme.headline.small}>
            {" "}
            Réservation de livraison
          </Text>
        </Flexible>
        <Flexible size={2} justifyContent={"end"}>
          <ButtonOutlined
            onClick={() => (window.location.href = "/multi/deliveries/general")}
          >
            <SvgPicture src={ButtonMultiDelivery} width="16px" height="16px" />
            <Text
              margin={{ left: "10px" }}
              textStyle={theme.textTheme.label.medium}
            >
              Saisie multiple
            </Text>
          </ButtonOutlined>
        </Flexible>
        <Flexible margin={{ left: "20px" }} />
      </Row>
      <Row>
        <Flexible size={3}>
          <Column width="100%">
            <FirstStep orderId={orderId} prebookId={prebookId} />
            <SecondStep orderId={orderId} prebookId={prebookId} />
            <ThirdStep orderId={orderId} prebookId={prebookId} />
          </Column>
        </Flexible>
        <Flexible margin={{ left: "20px" }}>
          <OrderSummary orderId={orderId} prebookId={prebookId} />
        </Flexible>
      </Row>
    </Container>
  );
}

export default OrderScreen;

/** Styled Component */
const Container = styled.div`
  max-width: 1300px;
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
