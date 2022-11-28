import { CurrentRetailpointNotifier } from "@yper-script/react/app/notifiers/retailpoint/current_retailpoint_notifier";
import {
  Column,
  Flexible,
  Row,
  Spacing,
} from "@yper-script/react/app/widget/generic";
import { MaterialIcon, Text } from "@yper-script/react/app/widget/mixins";
import RoundedIcon from "@yper-script/react/app/widget/rounded_icon";
import { PrimaryTag } from "@yper-script/react/app/widget/tags";
import { theme } from "@yper-script/react/app/widget/theme";
import { Address } from "@yper-script/react/data/entity/address.entity";
import { Retailpoint } from "@yper-script/react/data/entity/retailpoint.entity";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled, { useTheme } from "styled-components";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
} from "styled-dropdown-component";
const storeIcon = "/img/react/icon/ic_store.svg";

export default function RetailPointList(props: {
  retailPointList: Retailpoint[];
}) {
  const theme = useTheme();

  return (
    <>
      {props.retailPointList.map((rp, index) => (
        <RetailPoint
          key={rp.id}
          background={
            index % 2 == 0
              ? theme.color.grayscale["000"]
              : theme.color.grayscale["100"]
          }
          retailPoint={rp}
        />
      ))}
    </>
  );
}

function RetailPoint(props: {
  address?: Address;
  background: string;
  retailPoint: Retailpoint;
}) {
  const [dropdown, setDropdown] = useState(false);
  const currentLoadable = useRecoilValue(CurrentRetailpointNotifier.idProvider);
  const isCurrentRp = props.retailPoint.id === currentLoadable.contents;

  return (
    <RetailPointRow
      background={props.background}
      padding={{ left: "20px", right: "20px", top: "24px", bottom: "24px" }}
      alignItems="center"
    >
      <Spacing margin={{ right: "12px" }}>
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
      </Spacing>
      <Flexible size={3}>
        <Column justifyContent="start" width="100%">
          <Text
            textStyle={theme.textTheme.body.large.copyWith({
              color: theme.color.grayscale["700"],
            })}
          >
            {props.retailPoint.name}
          </Text>
          <Row justifyContent="start">
            <Text
              textStyle={theme.textTheme.body.medium.copyWith({
                color: theme.color.grayscale["300"],
              })}
              margin={{ right: "24px" }}
            >
              {props.retailPoint.address.formattedAddress}
            </Text>
          </Row>
        </Column>
      </Flexible>
      {isCurrentRp && (
        <Flexible>
          <PrimaryTag>CONNECTÉ</PrimaryTag>
        </Flexible>
      )}
      <Dropdown>
        <MoreButton
          margin={{ left: "12px" }}
          onClick={() => setDropdown(!dropdown)}
        >
          <MaterialIcon name="more_horiz" />
        </MoreButton>
        <CustomDropdownMenu
          right={true}
          hidden={!dropdown}
          toggle={() => setDropdown(!dropdown)}
        >
          <CustomDropdownItem
            onClick={() => {
              setDropdown(false);
            }}
          >
            <Link to={`/account/retailpoint/${props.retailPoint.id}`}>
              <Text textStyle={theme.textTheme.body.medium}>
                Voir la fiche détail
              </Text>
            </Link>
          </CustomDropdownItem>
        </CustomDropdownMenu>
      </Dropdown>
    </RetailPointRow>
  );
}

const RetailPointRow = styled(Row)<{ background: string }>`
  background: ${props => props.background};
`;

const MoreButton = styled(Spacing)`
  cursor: pointer;
`;

const CustomDropdownMenu = styled(DropdownMenu)`
  padding: 0 !important;
`;

const CustomDropdownItem = styled(DropdownItem)`
  cursor: pointer;
  padding: 0.75rem 1.5rem !important;
`;
