import Map from "@yper-script/react/app/widget/map";
import { ProRetailpointsNotifier } from "@yper-script/react/app/notifiers/retailpoint/pro_retailpoints_notifier";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  CardBody,
  CardHeader,
  CardTitle,
  MainCard,
} from "@yper-script/react/app/widget/card";
import { Column, Flexible, Row } from "@yper-script/react/app/widget/generic";
import RoundedIcon from "@yper-script/react/app/widget/rounded_icon";
import { SvgPicture, Text } from "@yper-script/react/app/widget/mixins";
import { theme } from "@yper-script/react/app/widget/theme";
import { CurrentRetailpointNotifier } from "@yper-script/react/app/notifiers/retailpoint/current_retailpoint_notifier";
import moment from "moment";
import { PrimaryTag } from "@yper-script/react/app/widget/tags";
const storeIcon = "/img/react/icon/ic_store.svg";
const locationIcon = "/img/react/icon/ic_pin.svg";
const phoneIcon = "/img/react/icon/ic_phone.svg";
const arrowLeftIcon = "/img/icon/arrow-left_icon.svg";

export default function RetailPointDetailsScreen() {
  document.title = "Yper.shop | Mon point de vente";
  const urlParams = useParams();
  const retailpointInfo = useRecoilValue(
    ProRetailpointsNotifier.getRetailpointInfos(urlParams.id)
  );
  const currentIdLoadable = useRecoilValue(
    CurrentRetailpointNotifier.idProvider
  );
  const isCurrentRp = urlParams.id === currentIdLoadable.contents;
  enum days {
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  }
  if (!retailpointInfo) return <></>;

  return (
    <>
      <Link to="/account/retailpoint">
        <Row
          alignItems="center"
          justifyContent="start"
          margin={{ bottom: "16px" }}
        >
          <SvgPicture
            src={arrowLeftIcon}
            color={theme.color.light_blue["500"]}
          />
          <Text
            textStyle={theme.textTheme.body.medium.copyWith({
              color: theme.color.light_blue["500"],
            })}
            padding={{ left: "10px" }}
          >
            Retour à la liste des points de vente
          </Text>
        </Row>
      </Link>
      <Map
        retailPointList={[retailpointInfo]}
        enableScrollZoom={true}
        icon={["store"]}
        height={"175px"}
      />
      <MainCard>
        <CardHeader>
          <Row>
            <CardTitle alignItems="center" justifyContent="start">
              <RoundedIcon
                iconLink={storeIcon}
                iconColor={
                  isCurrentRp
                    ? theme.color.grayscale["000"]
                    : theme.color.grayscale["400"]
                }
                background={isCurrentRp && theme.color.secondary["400"]}
                shadow={isCurrentRp && theme.color.secondary["300"]}
              />
              <div>
                <span>{retailpointInfo.name}</span>
                <span>{retailpointInfo.address.city}</span>
              </div>
              {isCurrentRp && (
                <Flexible alignItems="center" justifyContent="end" size={3}>
                  <PrimaryTag>CONNECTÉ</PrimaryTag>
                </Flexible>
              )}
            </CardTitle>
          </Row>
        </CardHeader>
        <CardBody>
          <Row
            padding={{
              top: "20px",
              right: "44px",
              bottom: "30px",
              left: "44px",
            }}
          >
            <Column
              size={1}
              justifyContent="start"
              alignItems="start"
              margin={{ right: "100px" }}
            >
              <Row>
                <Text>Coordonnées</Text>
              </Row>
              <Row alignItems="center" margin={{ top: "13px" }}>
                <SvgPicture
                  src={locationIcon}
                  color={theme.color.grayscale["400"]}
                  width={"15.6px"}
                  height={"15.6px"}
                />
                <Text
                  padding={{ left: "10px" }}
                  textStyle={theme.textTheme.body.medium.copyWith({
                    color: theme.color.grayscale["400"],
                  })}
                >
                  {retailpointInfo.address.formattedAddress}
                </Text>
              </Row>
              <Row alignItems="center" margin={{ top: "13px" }}>
                <SvgPicture
                  src={phoneIcon}
                  color={theme.color.grayscale["400"]}
                  width={"13.6px"}
                  height={"13.6px"}
                />
                <Text
                  padding={{ left: "10px" }}
                  textStyle={theme.textTheme.body.medium.copyWith({
                    color: theme.color.grayscale["400"],
                  })}
                >
                  {retailpointInfo.phone.public}
                </Text>
              </Row>
              {retailpointInfo.phone.private && (
                <Row alignItems="center" margin={{ top: "13px" }}>
                  <SvgPicture
                    src={phoneIcon}
                    color={theme.color.grayscale["400"]}
                    width={"13.6px"}
                    height={"13.6px"}
                  />
                  <Text
                    padding={{ left: "10px" }}
                    textStyle={theme.textTheme.body.medium.copyWith({
                      color: theme.color.grayscale["400"],
                    })}
                  >{`${retailpointInfo.phone.private} (privé)`}</Text>
                </Row>
              )}
            </Column>
            <Column size={1} alignItems="start">
              <Row>
                <Text>Horaires d'ouverture</Text>
              </Row>
              {retailpointInfo.deliveryHours.map((deliveryHour, index) => (
                <Row key={days[index]} width={"100%"} margin={{ top: "10px" }}>
                  <Column>
                    <Text
                      textStyle={theme.textTheme.body.medium.copyWith({
                        color: theme.color.grayscale["400"],
                      })}
                    >
                      {days[index]}
                    </Text>
                  </Column>
                  <Column>
                    <Text
                      textStyle={theme.textTheme.body.medium.copyWith({
                        color: theme.color.grayscale["400"],
                      })}
                    >
                      {`${moment(deliveryHour.hours.start).format(
                        "HH:mm"
                      )} - ${moment(deliveryHour.hours.end).format("HH:mm")}`}
                    </Text>
                  </Column>
                </Row>
              ))}
            </Column>
          </Row>
        </CardBody>
      </MainCard>
    </>
  );
}
