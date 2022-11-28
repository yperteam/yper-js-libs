import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import InvoiceTable from "@yper-script/react/app/screen/account/invoice/invoice_table";
import {
  CardBody,
  CardHeader,
  CardTitle,
  MainCard,
} from "@yper-script/react/app/widget/card";
import { Expanded, Spacing } from "@yper-script/react/app/widget/generic";
import {
  InvoiceDateFilter,
  InvoiceNotifier,
} from "@yper-script/react/app/notifiers/invoice/invoice_notifier";

// TODO add missing trads
function InvoiceScreen() {
  document.title = "Yper.shop | Mes factures";
  const [dateFilter, setDateFilter] = useRecoilState(
    InvoiceNotifier.dateFilterProvider
  );
  const setSelected = useSetRecoilState(InvoiceNotifier.selectedProvider);

  const optionsFilters = [
    ["Ce mois-ci", InvoiceDateFilter.THIS_MONTH],
    ["Le mois dernier", InvoiceDateFilter.LAST_MONTH],
    ["les 3 derniers mois", InvoiceDateFilter.LAST_3_MONTH],
    ["Les 6 derniers mois", InvoiceDateFilter.LAST_6_MONTH],
    ["Les 12 derniers mois", InvoiceDateFilter.LAST_12_MONTH],
    ["Toutes", InvoiceDateFilter.ALL],
  ];

  function handleDateFilter(event: ChangeEvent<any>) {
    setDateFilter(parseInt(event.target.value));
    setSelected([]);
  }

  return (
    <>
      <MainCard>
        <CardHeader>
          <CardTitle width="auto">
            <i className="material-icons">receipt</i>
            <span>Mes factures</span>
          </CardTitle>
          <Expanded></Expanded>
          <Spacing margin={{ right: "21px" }}>Période :</Spacing>
          <SelectCustom value={dateFilter} onChange={handleDateFilter}>
            {optionsFilters.map(filter => (
              <option key={filter[1]} value={filter[1]}>
                {filter[0]}
              </option>
            ))}
          </SelectCustom>
        </CardHeader>
        <CardBody>
          <InvoiceTable></InvoiceTable>
        </CardBody>
      </MainCard>
    </>
  );
}

const SelectCustom = styled.select`
  padding: 7px 14px;
`;

export default InvoiceScreen;
