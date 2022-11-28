import React, { useEffect } from "react";
import { Column, Row } from "@yper-script/react/app/widget/generic";
import { SvgPicture, Text } from "@yper-script/react/app/widget/mixins";
import styled, { useTheme } from "styled-components";
import { ButtonPrimary } from "@yper-script/react/app/widget/button";
import { useRecoilValue } from "recoil";
import { FavoriteAddressNotifier } from "@yper-script/react/app/notifiers/pro/favorite_address_notifier";

const locationIcon = "/img/react/icon/ic_pin.svg";
const addCircleSolidIcon = "/img/react/icon/ic_add_circle_solid.svg";
const shoppingBagSideIcon = "/img/react/icon/ic_shopping_bag_side.svg";
const deliveryDoorIcon = "/img/react/icon/ic_delivery_door.svg";
const tripPinsIcon = "/img/react/icon/ic_trip_pins.svg";
const euroSymbolIcon = "/img/react/icon/ic_euro_symbol.svg";

function ContactDetails() {
  const theme = useTheme();
  const repertory = useRecoilValue(FavoriteAddressNotifier.provider);
  const selectedId = useRecoilValue(FavoriteAddressNotifier.selectedId);
  const repertoryDetail = useRecoilValue(
    FavoriteAddressNotifier.repertoryDetailProvider(
      selectedId || repertory[0].id
    )
  );

  return (
    <>
      <MapContainer
        margin={{ top: "12px", right: "12px", left: "12px" }}
        height="207px"
      ></MapContainer>
      <Informations
        justifyContent="space-between"
        margin={{ top: "17px", right: "12px", bottom: "18px", left: "12px" }}
        padding={{ bottom: "44px" }}
      >
        <Column padding={{ left: "15px" }}>
          <Text
            textStyle={theme.textTheme.title.large.copyWith({
              color: theme.color.primary["400"],
            })}
          >
            {repertoryDetail.firstname} {repertoryDetail.lastname}
          </Text>
          <Row
            justifyContent="flex-start"
            alignItems="center"
            margin={{ top: "8px" }}
          >
            <SvgPicture
              src={locationIcon}
              color={theme.color.primary["200"]}
              width={"15.6px"}
              height={"15.6px"}
            />
            <Text
              padding={{ left: "8px" }}
              textStyle={theme.textTheme.body.medium.copyWith({
                color: theme.color.primary["400"],
              })}
            >
              {repertoryDetail.address.formattedAddress}
            </Text>
          </Row>
          <Row
            justifyContent="flex-start"
            alignItems="center"
            margin={{ top: "8px" }}
          >
            <SvgPicture
              src={locationIcon}
              color={theme.color.primary["200"]}
              width={"15.6px"}
              height={"15.6px"}
            />
            <Text
              padding={{ left: "8px" }}
              textStyle={theme.textTheme.body.medium.copyWith({
                color: theme.color.primary["400"],
              })}
            >
              {repertoryDetail.phone}
            </Text>
          </Row>
          <Row
            justifyContent="flex-start"
            alignItems="center"
            margin={{ top: "8px" }}
          >
            <SvgPicture
              src={locationIcon}
              color={theme.color.primary["200"]}
              width={"15.6px"}
              height={"15.6px"}
            />
            <Text
              padding={{ left: "10px" }}
              textStyle={theme.textTheme.body.medium.copyWith({
                color: theme.color.primary["400"],
              })}
            >
              {repertoryDetail.email}
            </Text>
          </Row>
          <Row
            justifyContent="flex-start"
            alignItems="center"
            margin={{ top: "8px" }}
          >
            <SvgPicture
              src={locationIcon}
              color={theme.color.primary["200"]}
              width={"15.6px"}
              height={"15.6px"}
            />
            <Text
              padding={{ left: "8px" }}
              textStyle={theme.textTheme.body.medium.copyWith({
                color: theme.color.primary["400"],
              })}
            >
              {repertoryDetail.address.additional}
            </Text>
          </Row>
        </Column>
        <Column justifyContent="start">
          <ButtonPrimary>
            <SvgPicture
              src={addCircleSolidIcon}
              color={theme.color.grayscale["000"]}
              width="15px"
              height="15px"
              margin={{ right: "10px" }}
            />
            <Text>Nouvelle livraison</Text>
          </ButtonPrimary>
        </Column>
      </Informations>
      <Row justifyContent="space-around">
        <Column alignItems="center">
          <SvgPicture
            src={tripPinsIcon}
            color={theme.color.primary["200"]}
            width={"32px"}
            height={"32px"}
          />
          <Text
            textStyle={theme.textTheme.headline.small.copyWith({
              color: theme.color.primary["400"],
            })}
            margin={{ top: "8px" }}
          >
            1.7 Km
          </Text>
          <Text
            textStyle={theme.textTheme.label.small.copyWith({
              color: theme.color.primary["300"],
            })}
          >
            Distance
          </Text>
        </Column>
        <Column alignItems="center">
          <SvgPicture
            src={deliveryDoorIcon}
            color={theme.color.primary["200"]}
            width={"32px"}
            height={"32px"}
          />
          <Text
            textStyle={theme.textTheme.headline.small.copyWith({
              color: theme.color.primary["400"],
            })}
            margin={{ top: "8px" }}
          >
            8
          </Text>
          <Text
            textStyle={theme.textTheme.label.small.copyWith({
              color: theme.color.primary["300"],
            })}
          >
            Livraisons
          </Text>
        </Column>
        <Column alignItems="center">
          <SvgPicture
            src={euroSymbolIcon}
            color={theme.color.primary["200"]}
            width={"32px"}
            height={"32px"}
          />
          <Text
            textStyle={theme.textTheme.headline.small.copyWith({
              color: theme.color.primary["400"],
            })}
            margin={{ top: "8px" }}
          >
            7,50€
          </Text>
          <Text
            textStyle={theme.textTheme.label.small.copyWith({
              color: theme.color.primary["300"],
            })}
          >
            Coût moyen
          </Text>
        </Column>
        <Column alignItems="center">
          <SvgPicture
            src={shoppingBagSideIcon}
            color={theme.color.primary["200"]}
            width={"32px"}
            height={"32px"}
          />
          <Text
            textStyle={theme.textTheme.headline.small.copyWith({
              color: theme.color.primary["400"],
            })}
            margin={{ top: "8px" }}
          >
            73,85€
          </Text>
          <Text
            textStyle={theme.textTheme.label.small.copyWith({
              color: theme.color.primary["300"],
            })}
          >
            Panier moyen
          </Text>
        </Column>
      </Row>
    </>
  );
}

const Informations = styled(Row)`
  border-bottom: solid 1px ${props => props.theme.color.grayscale["200"]};
`;
const MapContainer = styled(Row)`
  background-color: ${props => props.theme.color.grayscale["100"]};
  border-radius: 10px;
`;

export default ContactDetails;
