import React, { Suspense, useMemo } from "react";
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { useTranslation } from "react-i18next";
import moment from "moment";
import styled, { useTheme } from "styled-components";
import { MaterialIcon, Text } from "@yper-script/react/app/widget/mixins";
import { Row, Spacing } from "@yper-script/react/app/widget/generic";
import DataTable from "@yper-script/react/app/widget/data_table";
import { Invoice } from "@yper-script/react/data/entity/invoice.entity";
import { Dot } from "@yper-script/react/app/widget/dot";
import { InvoiceEmailDialog } from "@yper-script/react/app/screen/account/invoice/invoice_email_dialog";
import { InvoiceNotifier } from "@yper-script/react/app/notifiers/invoice/invoice_notifier";
import { InvoiceDownloadNotifier } from "@yper-script/react/app/notifiers/invoice/invoice_download_notifier";
import { InvoiceOrderNotifier } from "@yper-script/react/app/notifiers/invoice/invoice_order_notifier";
import { InvoiceEmailNotifier } from "@yper-script/react/app/notifiers/invoice/invoice_email_notifier";

// TODO export it ?
function floatToStringFormatted(n: number): string {
  return parseFloat((Math.round(n * 100) / 100).toString())
    .toFixed(2)
    .toString()
    .replace(".", ",");
}

function invoiceStatus(invoice: Invoice) {
  if (invoice.payed === true) {
    return "paid";
  } else if (invoice.paymentPending === true) {
    return "in_progress";
  } else {
    return "to_pay";
  }
}

function InvoiceTable() {
  const loadable = useRecoilValueLoadable(InvoiceNotifier.provider);
  const selected = useRecoilValue(InvoiceNotifier.selectedProvider);
  const modalEmail = useRecoilValue(InvoiceEmailNotifier.dialogProvider);

  const { t } = useTranslation([], {
    keyPrefix: "invoice",
  });

  const columns = useMemo(() => {
    return [
      {
        Header: () => (
          <Suspense fallback="">
            <AllInvoiceCheckbox />
          </Suspense>
        ),
        id: "checkbox",
        disableSortBy: true,
        Cell: ({ row }) => <InvoiceCheckbox id={row.original.id} />,
      },
      {
        Header: selected.length == 0 ? "Numéro" : <SelectedHeader />,
        id: "number",
        disableSortBy: selected.length > 0,
        accessor: "number",
        Cell: ({ row }) => {
          return <RowText content={row.original.number} align={"left"} />;
        },
      },
      {
        Header: <InvoiceHeader hide={selected.length > 0} content={"Type"} />,
        id: "type",
        disableSortBy: selected.length > 0,
        accessor: row => row.type,
        Cell: ({ row }) => {
          return (
            <RowText content={t("type." + row.original.type)} align={"left"} />
          );
        },
      },
      {
        Header: <InvoiceHeader hide={selected.length > 0} content={"Date"} />,
        id: "date",
        disableSortBy: selected.length > 0,
        accessor: row => row.createdAt.valueOf(),
        Cell: ({ row }) => {
          return (
            <RowText
              content={moment(row.original.createdAt).format("DD/MM/YYYY")}
              align={"left"}
            />
          );
        },
      },
      {
        Header: (
          <InvoiceHeader hide={selected.length > 0} content={"Montant TTC"} />
        ),
        id: "price",
        disableSortBy: selected.length > 0,
        accessor: row => `${floatToStringFormatted(row.price.ttc)} €`,
        Cell: ({ row }) => {
          return (
            <RowText
              content={`${floatToStringFormatted(row.original.price.ttc)} €`}
              align={"left"}
            />
          );
        },
      },
      {
        Header: <InvoiceHeader hide={selected.length > 0} content={"Statut"} />,
        id: "status",
        disableSortBy: selected.length > 0,
        accessor: row => invoiceStatus(row),
        Cell: ({ row }) => {
          let status = invoiceStatus(row.original);
          return (
            <StatusContainer status={status}>
              <StatusDot status={status}></StatusDot>
              <span>{t("status." + status)}</span>
            </StatusContainer>
          );
        },
      },
      /*{
        Header: (
          <InvoiceHeader
            hide={selected.length > 0}
            content={"Mode de paiement"}
          />
        ),
        id: "paymentMethod",
        disableSortBy: true,
        Cell: ({ row }) => (
          // TODO
          <span> </span>
        ),
      },*/
      {
        Header: () => null,
        id: "dl",
        disableSortBy: true,
        Cell: ({ row }) => <DownloadButton id={row.original.id} />,
      },
    ];
  }, [selected.length > 0]);

  return (
    <>
      <DataTable columns={columns} loadable={loadable} />
      {modalEmail && <InvoiceEmailDialog />}
    </>
  );
}

function SelectedHeader() {
  return (
    <SelectedHeaderContent alignItems="center">
      <PayInvoiceButton />
      <DownloadAllButton />
      <MailExportButton />
    </SelectedHeaderContent>
  );
}

function RowText(data: { content: string; align: string }) {
  const theme = useTheme();
  return (
    <CustomText textStyle={theme.textTheme.body.medium} align={data.align}>
      {data.content}
    </CustomText>
  );
}

function InvoiceCheckbox(data: { id: string }) {
  const [selected, setSelected] = useRecoilState(
    InvoiceNotifier.selectedProvider
  );
  let checked = selected.includes(data.id);

  return (
    <InputInvoice
      type="checkbox"
      checked={checked}
      onChange={() => {
        if (checked) {
          setSelected(selected.filter(m => m != data.id));
        } else {
          setSelected([...selected, data.id]);
        }
      }}
    />
  );
}

function AllInvoiceCheckbox() {
  const data = useRecoilValueLoadable(InvoiceNotifier.provider).contents;
  const [selected, setSelected] = useRecoilState(
    InvoiceNotifier.selectedProvider
  );
  let checked = selected.length > 0; // TODO selected === data.map((m) => m.id);

  // TODO tristate icon when at least one but not all is checked
  return (
    <InputSpacing margin={{ top: "2px", bottom: "2px" }}>
      <InputInvoice
        type="checkbox"
        checked={checked}
        onChange={() => {
          setSelected(checked ? [] : data.map(m => m.id));
        }}
      />
    </InputSpacing>
  );
}

function PayInvoiceButton() {
  const theme = useTheme();
  const selectedInvoices = useRecoilValue(
    InvoiceNotifier.selectedInvoicesProvider
  );
  const payInvoice = useSetRecoilState(InvoiceOrderNotifier.provider);
  const canPay = selectedInvoices.every(i => !i.payed && !i.paymentPending);
  return (
    <HeaderButton
      enabled={canPay}
      textStyle={theme.textTheme.body.small}
      onClick={
        canPay
          ? () =>
              InvoiceOrderNotifier.notifier(
                selectedInvoices.map(i => i.id),
                payInvoice
              )
          : () => {}
      }
    >
      <Spacing margin={{ right: "4px" }}>
        <i className="material-icons">credit_card</i>
      </Spacing>
      Payer
    </HeaderButton>
  );
}

function DownloadAllButton() {
  const selected = useRecoilValue(InvoiceNotifier.selectedProvider);
  const download = useSetRecoilState(InvoiceDownloadNotifier.multipleProvider);
  const theme = useTheme();

  return (
    <HeaderButton
      textStyle={theme.textTheme.body.small}
      onClick={() => {
        InvoiceDownloadNotifier.multipleNotifier(selected, download);
      }}
    >
      <Spacing margin={{ right: "4px" }}>
        <i className="material-icons">get_app</i>
      </Spacing>
      Télécharger
    </HeaderButton>
  );
}

function MailExportButton() {
  const theme = useTheme();
  const setModalEmail = useSetRecoilState(InvoiceEmailNotifier.dialogProvider);

  return (
    <HeaderButton
      onClick={() => setModalEmail(true)}
      textStyle={theme.textTheme.body.small}
    >
      <Spacing margin={{ right: "4px" }}>
        <i className="material-icons">mail</i>
      </Spacing>
      Envoyer par mail
    </HeaderButton>
  );
}

function DownloadButton(props: { id: string }) {
  const download = useSetRecoilState(
    InvoiceDownloadNotifier.provider(props.id)
  );

  return (
    <DownloadIcon
      onClick={() => {
        InvoiceDownloadNotifier.notifier(props.id, download);
      }}
    >
      <MaterialIcon name="get_app" />
    </DownloadIcon>
  );
}

function InvoiceHeader(props: { content: string; hide: boolean }) {
  const theme = useTheme();

  return (
    <Text
      style={{ visibility: props.hide ? "hidden" : "visible" }}
      textStyle={theme.textTheme.body.small.copyWith({
        color: theme.color.grayscale["000"],
      })}
      textAlign={"left"}
    >
      {props.content}
    </Text>
  );
}

export default InvoiceTable;

const CustomText = styled(Text)<any>`
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: ${props => (props.align ? props.align : "center")};
  padding-left: 16px;
`;

const SelectedHeaderContent = styled(Row)`
  position: absolute;
  bottom: 50%;
  top: 50%;
  align-items: center;
  align-content: center;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  z-index: 1;
`;

function getStatusColor(status: string) {
  if (status === "paid") {
    return "#2cc5bc";
  } else if (status === "to_pay") {
    return "#fd891a";
  } else {
    return "#36506c";
  }
}

const StatusContainer = styled(Text)<{ status: string }>`
  color: ${props => getStatusColor(props.status)};
  text-transform: uppercase;
  text-align: left;
`;

const StatusDot = styled(Dot)<{ status: string }>`
  background-color: ${props => getStatusColor(props.status)};
`;

const HeaderButton = styled(Text)<{ enabled?: boolean }>`
  color: ${props => (props.enabled == false ? "grey" : "white")};
  cursor: ${props => (props.enabled == false ? "not-allowed" : "pointer")};
  padding-right: 20px;
  i.material-icons {
    font-size: 1em;
  }
`;

const InputInvoice = styled.input`
  height: 14px;
`;

const DownloadIcon = styled.a`
  cursor: pointer;
  padding: 0.25rem 1.5rem;
`;

const InputSpacing = styled(Spacing)`
  width: 100%;
`;
