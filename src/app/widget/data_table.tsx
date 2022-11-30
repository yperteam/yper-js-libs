import React, { useMemo } from "react";
import styled, { css, useTheme } from "styled-components";
import { useTable, usePagination, useSortBy } from "react-table";
import { Text } from "./mixins";
import { Col, Row } from "./generic";
import { Paginator } from "./paginator";
import { CustomLoader } from "./loader";
import { Loadable } from "recoil";

const dropdownIcon = "/img/icon/dropdown_icon_white.svg";

export function DataTable<T>(props: { columns: any; loadable: Loadable<T[]> }) {
  const theme = useTheme();
  let data = useMemo(
    () => (props.loadable.state == "hasValue" ? props.loadable.contents : []),
    [props.loadable]
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    // @ts-ignore
    page,
    // @ts-ignore
    pageCount,
    // @ts-ignore
    gotoPage,
    // @ts-ignore
    setPageSize,
    // @ts-ignore
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: props.columns,
      // @ts-ignore
      data: data,
      // @ts-ignore
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <CustomTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableHeader
                  // @ts-ignore
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <Row justifyContent={"flex-start"} alignItems={"center"}>
                    {typeof column.Header == "string" && (
                      <Text
                        textStyle={theme.textTheme.body.small.copyWith({
                          color: theme.color.grayscale["000"],
                        })}
                        textAlign={"left"}
                      >
                        {column.render("Header")}
                      </Text>
                    )}

                    {typeof column.Header != "string" &&
                      column.render("Header")}
                    {    // @ts-ignore
                      column.isSorted && (
                        <Col justifyContent="right">
                          <DropdownIcon
                            // @ts-ignore
                            open={column.isSortedDesc}
                            src={dropdownIcon}
                            alt={"sorting_icon"}
                          />
                        </Col>
                      )}
                  </Row>
                </TableHeader>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row: any) => {
            prepareRow(row);
            return (
              <TableRowBody {...row.getRowProps()}>
                {row.cells.map((cell: any) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </TableRowBody>
            );
          })}
        </TableBody>
      </CustomTable>

      {props.loadable.state == "loading" && <CustomLoader></CustomLoader>}

      {props.loadable.state == "hasError" && <div>Une erreur est survenue</div>}

      {props.loadable.state == "hasValue" && (
        <Paginator
          contentLength={data.length}
          pageSize={pageSize}
          setPageSize={setPageSize}
          pageIndex={pageIndex}
          gotoPage={gotoPage}
          pageCount={pageCount}
        />
      )}
    </>
  );
}

/** Table */
const CustomTable = styled.table`
  box-shadow: 0 2px 20px rgba(54, 80, 108, 0.1);
  width: 100%;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #e9eff2;
`;

const TableBody = styled.tbody`
  text-align: center;
`;

const TableHeader = styled.th`
  padding: 12px 16px;
  position: relative;
`;

const TableHead = styled.thead`
  border-radius: 6px 0 6px 0;
  background-color: ${props => props.theme.color.primary["500"]};
  > tr > th {
    border: none !important;
  }
  th:first-child {
    border-radius: 6px 0 0 0;
  }
  th:last-child {
    border-radius: 0 6px 0 0;
  }
`;

const TableRowBody = styled.tr`
  background-color: ${props => props.theme.color.grayscale["100"]};
  padding-left: 16px;
  padding-right: 52px;

  &:nth-child(odd) {
    background-color: ${props => props.theme.color.grayscale["000"]};
  }
`;

const DropdownIcon = styled.img<{ open: boolean }>`
  transition: all 0.2s ease;
  ${props =>
    props.open &&
    css`
      transform: rotate(180deg);
    `}
`;
