import React, { useMemo } from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { ProRetailpointsStatsNotifier } from "@yper-script/react/app/notifiers/retailpoint/pro_retailpoints_stats_notifier";
import styled, { useTheme } from "styled-components";
import { Text } from "@yper-script/react/app/widget/mixins";
import { ProRetailpointsNotifier } from "@yper-script/react/app/notifiers/retailpoint/pro_retailpoints_notifier";
import { formatCash } from "@yper-script/react/app/helpers/generic_helper";
import DataTable from "@yper-script/react/app/widget/data_table";

function RetailPointList() {
  /** Recoil */
  const loadable = useRecoilValueLoadable(
    ProRetailpointsStatsNotifier.provider
  );

  let columns = useMemo(
    () => [
      {
        Header: "Pos",
        disableSortBy: true,
        Cell: ({ row }) => {
          return <RowText content={(+row.id + 1).toString()} />;
        },
      },
      {
        Header: "Points de vente",
        Cell: ({ row }) => {
          return <RetailPointName {...row} />;
        },
      },
      {
        Header: "Département",
        Cell: ({ row }) => {
          return <PostCode {...row} />;
        },
      },
      {
        Header: "Livraisons",
        accessor: row => row.totalDeliveries,
        Cell: ({ row }) => {
          return <RowText content={row.original.totalDeliveries} />;
        },
      },
      {
        Header: "CA estimé",
        accessor: row => `${row.totalDeliveries * row.cartPriceAverage}`,
        Cell: ({ row }) => {
          return (
            <RowText
              content={
                formatCash(
                  row.original.totalDeliveries * row.original.cartPriceAverage
                ) + " €"
              }
            />
          );
        },
      },
      {
        Header: "Panier moy.",
        accessor: row => row.cartPriceAverage,
        Cell: ({ row }) => {
          return <RowText content={row.original.cartPriceAverage + " €"} />;
        },
      },
      {
        Header: "Coût moy.",
        accessor: row => row.cartPriceAverage,
        Cell: ({ row }) => {
          return (
            <RowText content={row.original.deliveryPriceHtAverage + " €"} />
          );
        },
      },
      {
        Header: "Distance moy.",
        accessor: row => row.deliveryDistanceAverage,
        Cell: ({ row }) => {
          return (
            <RowText
              content={
                (row.original.deliveryDistanceAverage / 1000).toFixed(2) + " km"
              }
            />
          );
        },
      },
      {
        Header: "Note Pdv",
        accessor: row => row.retailpointOpinionAverage,
        Cell: ({ row }) => {
          return (
            <RowText
              content={
                (row.original.retailpointOpinionAverage > 0
                  ? row.original.retailpointOpinionAverage
                  : "--") + "/5"
              }
            />
          );
        },
      },
      {
        Header: "Note Shoppers",
        accessor: row => row.delivererOpinionAverage,
        Cell: ({ row }) => {
          return (
            <RowText
              content={
                (row.original.delivererOpinionAverage > 0
                  ? row.original.delivererOpinionAverage
                  : "--") + "/5"
              }
            />
          );
        },
      },
    ],
    []
  );

  return <DataTable loadable={loadable} columns={columns} />;
}

export default RetailPointList;

function RetailPointName(data) {
  const retailpointInfo = useRecoilValue(
    ProRetailpointsNotifier.getRetailpointInfos(data.original.retailpoint.id)
  );
  return <>{retailpointInfo && <RowText content={retailpointInfo.name} />}</>;
}

function PostCode(data) {
  const retailpointInfo = useRecoilValue(
    ProRetailpointsNotifier.getRetailpointInfos(data.original.retailpoint.id)
  );

  return (
    <>{retailpointInfo && <RowText content={retailpointInfo.address.zip} />}</>
  );
}

function RowText(data: { content: string }) {
  const theme = useTheme();
  return (
    <CustomText textStyle={theme.textTheme.body.medium}>
      {data.content}
    </CustomText>
  );
}

const CustomText = styled(Text)<any>`
  text-align: ${props => (props.align ? props.align : "left")};
  padding-left: 16px;
  padding-top: 18px;
  padding-bottom: 18px;
`;
