import React, { useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { SvgPicture, Text } from "@yper-script/react/app/widget/mixins";
import { Column, Flexible, Row } from "@yper-script/react/app/widget/generic";
import { ButtonOutlined } from "@yper-script/react/app/widget/button";
import { useRecoilState, useRecoilValue } from "recoil";
import { StepNotifier } from "@yper-script/react/app/notifiers/order/step_notifier";
import StepForm, {
  editProvider,
} from "@yper-script/react/app/screen/order/first_step/step_form";
import { PrebookNotifier } from "@yper-script/react/app/notifiers/order/prebook_notifier";
import { OrderAddressNotifier } from "@yper-script/react/app/notifiers/order/order_address_notifier";
import {
  Mission,
  MissionClient,
} from "@yper-script/react/data/entity/mission.entity";
import { ItineraryMap } from "@yper-script/react/app/widget/map";

/** Images */
const DeliveryWayIcon = "/img/react/order/delivery_way_icon.svg";
const CheckStepIcon = "/img/react/order/check_step_icon.svg";
const EditIcon = "/img/react/order/edit_icon.svg";
const PhoneIcon = "/img/react/icon/ic_phone.svg";
const EmailIcon = "/img/react/icon/ic_read_email_at.svg";

function FirstStep(props: { orderId: string; prebookId: string }) {
  const theme = useTheme();
  const step = useRecoilValue(StepNotifier.provider(props.prebookId));
  const state = useRecoilValue(OrderAddressNotifier.provider(props.orderId));
  const statePreview = useRecoilValue(
    OrderAddressNotifier.previewProvider(props.orderId)
  );
  const [editForm, setEditForm] = useRecoilState(editProvider);
  const prebook = useRecoilValue(PrebookNotifier.provider(props.prebookId))
    .contents as Mission;

  useEffect(() => {
    if (state?.state === "hasValue") {
      setEditForm(false);
    }
  }, [state]);

  return (
    <>
      <Card>
        <CardTitle justifyContent={"start"} alignItems={"center"}>
          <SvgPicture
            src={step >= 1 && !editForm ? CheckStepIcon : DeliveryWayIcon}
          />
          <Text
            padding={{ left: "12px" }}
            textStyle={theme.textTheme.title.medium.copyWith({
              color: theme.color.primary["500"],
            })}
          >
            Trajet de livraison
          </Text>
          {step >= 1 && !editForm && (
            <Flexible justifyContent={"flex-end"}>
              <ButtonOutlined onClick={() => setEditForm(true)}>
                <SvgPicture src={EditIcon} />
                <Text
                  margin={{ left: "4px" }}
                  textStyle={theme.textTheme.label.medium}
                >
                  Modifier
                </Text>
              </ButtonOutlined>
            </Flexible>
          )}
        </CardTitle>
        <ItineraryMap
          fromCoordinates={prebook.sender?.address?.location?.coordinates}
          toCoordinates={prebook.receiver?.address?.location?.coordinates}
          itinerary={prebook.geojsonDirections ?? null}
          enableScrollZoom={true}
          height={"225px"}
          isLoading={statePreview?.state === "loading" ? true : false}
        />
        {(step == 0 || editForm) && (
          <StepForm orderId={props.orderId} prebookId={props.prebookId} />
        )}
        {step >= 1 && !editForm && (
          <StepSummary orderId={props.orderId} prebookId={props.prebookId} />
        )}
      </Card>
    </>
  );
}

export default FirstStep;

function StepSummary(props: { orderId: string; prebookId: string }) {
  const theme = useTheme();

  /** Recoil */
  const prebookLoadable = useRecoilValue(
    PrebookNotifier.provider(props.prebookId)
  );

  const prebook = prebookLoadable.contents;

  return (
    <Row
      padding={{ left: "78px", right: "24px", top: "24px", bottom: "24px" }}
      justifyContent={"space-around"}
      alignItems={"start"}
    >
      <Column>
        <Text
          textStyle={theme.textTheme.title.small.copyWith({
            color: theme.color.grayscale["400"],
          })}
          margin={{ bottom: "10px" }}
        >
          Adresse de retrait
        </Text>
        <AddressInfo client={prebook?.sender} />
      </Column>
      <Column margin={{ left: "16px", right: "16px" }}>
        <Text
          textStyle={theme.textTheme.title.small.copyWith({
            color: theme.color.grayscale["400"],
          })}
          margin={{ bottom: "10px" }}
        >
          Adresse de livraison
        </Text>
        <AddressInfo client={prebook?.receiver} />
      </Column>
      <Column>
        <Text
          textStyle={theme.textTheme.title.small.copyWith({
            color: theme.color.grayscale["400"],
          })}
          margin={{ bottom: "10px" }}
        >
          Destinataire
        </Text>
        <Text>
          {prebook?.receiver?.firstname ?? prebook?.receiver?.businessName}{" "}
          {prebook?.receiver?.lastname}
        </Text>
        <Row alignItems="center" justifyContent="start">
          <SvgPicture width="16px" height="16px" src={PhoneIcon} />
          <Text margin={{ left: "5px" }}>{prebook?.receiver?.phone}</Text>
        </Row>
        {prebook?.receiver?.email && (
          <Row alignItems="center" justifyContent="start">
            <SvgPicture width="16px" height="16px" src={EmailIcon} />
            <Text margin={{ left: "5px" }}>{prebook?.receiver?.email}</Text>
          </Row>
        )}
      </Column>
    </Row>
  );
}

function AddressInfo({ client }: { client?: MissionClient }) {
  return (
    <>
      <Text>
        {client?.address.streetNumber} {client?.address.street}
      </Text>
      <Text>
        {client?.address.zip} {client?.address.city}
      </Text>
      {client?.address?.floor && client?.address?.floor != "0" && (
        <Text>{`Etage : ${client?.address.floor}`}</Text>
      )}
      {client?.address?.apartment && (
        <Text>{`Appartement : ${client.address.apartment}`}</Text>
      )}
    </>
  );
}

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
