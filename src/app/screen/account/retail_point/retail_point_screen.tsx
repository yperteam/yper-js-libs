import React from "react";
import {
  CardBody,
  CardHeader,
  CardTitle,
  MainCard,
} from "@yper-script/react/app/widget/card";
import { Row } from "@yper-script/react/app/widget/generic";
import Map from "@yper-script/react/app/widget/map";
import { useRecoilValue } from "recoil";
import { ProRetailpointsNotifier } from "@yper-script/react/app/notifiers/retailpoint/pro_retailpoints_notifier";
import RetailPointList from "./retail_point_list";
import RoundedIcon from "@yper-script/react/app/widget/rounded_icon";
import { useTheme } from "styled-components";

const storeIcon = "/img/react/icon/ic_store.svg";

export default function RetailPointScreen() {
  document.title = "Yper.shop | Mes points de vente";
  const listLoadable = useRecoilValue(ProRetailpointsNotifier.provider);
  const theme = useTheme();

  return (
    <>
      <MainCard>
        <CardHeader>
          <Row justifyContent={"space-between"}>
            <CardTitle alignItems="center">
              <RoundedIcon
                iconColor={theme.color.primary[400]}
                iconLink={storeIcon}
              />
              <span>Mes points de vente</span>
            </CardTitle>
          </Row>
        </CardHeader>
        <CardBody>
          <Map
            retailPointList={listLoadable.contents.data}
            enableScrollZoom={true}
            icon={["store"]}
            height={"263px"}
          />
          <RetailPointList retailPointList={listLoadable.contents.data} />
        </CardBody>
      </MainCard>
    </>
  );
}
