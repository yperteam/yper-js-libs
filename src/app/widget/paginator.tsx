import React from "react";
import styled, { css, useTheme } from "styled-components";
import { Col, Spacing } from "./generic";
import { Text } from "./mixins";

/** Images */
const paginationLastIcon = "/img/react/pagination/pagination-last-button.svg";
const paginationFirstIcon = "/img/react/pagination/pagination-first-button.svg";
const paginationNextIcon = "/img/react/pagination/pagination-next-button.svg";
const paginationPrevIcon = "/img/react/pagination/pagination-prev-button.svg";
const paginationLastDisabledIcon =
  "/img/react/pagination/pagination-last-disabled.svg";
const paginationPreviousDisabledIcon =
  "/img/react/pagination/pagination-previous-disabled.svg";
const paginationNextDisabledIcon =
  "/img/react/pagination/pagination-next-disabled.svg";
const paginationFirstDisabledIcon =
  "/img/react/pagination/pagination-first-disabled.svg";

interface PaginatorProps {
  contentLength: number;
  pageSize: number;
  setPageSize: Function;
  pageIndex: number;
  gotoPage: Function;
  pageCount: number;
}

export function Paginator(props: PaginatorProps) {
  const theme = useTheme();

  let canNextPage = props.pageIndex < props.pageCount - 1;
  let canPreviousPage = props.pageIndex > 0;

  return (
    <PaginatorContainer justifyContent={"flex-end"}>
      <Spacing margin={{ right: "8px" }}>
        <Text textStyle={theme.textTheme.body.medium}>
          Résultats par page :
        </Text>
      </Spacing>
      <SelectCustom
        value={props.pageSize}
        onChange={e => {
          props.setPageSize(Number(e.target.value));
        }}
      >
        {[10, 25, 50].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </SelectCustom>
      <Spacing margin={{ right: "16px" }} />
      <Text
        textStyle={theme.textTheme.body.medium.copyWith({
          color: theme.color.primary["300"],
        })}
      >
        {props.pageIndex * props.pageSize + 1} -{" "}
        {props.pageSize * props.pageIndex + props.pageSize > props.contentLength
          ? props.contentLength
          : props.pageSize * props.pageIndex + props.pageSize}{" "}
        sur {props.contentLength}
      </Text>
      <Spacing margin={{ right: "16px" }} />
      <Spacing margin={{ right: "8px" }}>
        <Button onClick={() => props.gotoPage(0)} disabled={!canPreviousPage}>
          <PaginationIcon
            src={
              !canPreviousPage
                ? paginationFirstDisabledIcon
                : paginationFirstIcon
            }
            alt={"first_page"}
          />
        </Button>
      </Spacing>
      <Spacing margin={{ right: "8px" }}>
        <Button
          onClick={() => props.gotoPage(props.pageIndex - 1)}
          disabled={!canPreviousPage}
        >
          <PaginationIcon
            src={
              !canPreviousPage
                ? paginationPreviousDisabledIcon
                : paginationPrevIcon
            }
            alt={"prev_page"}
          />
        </Button>
      </Spacing>
      <Spacing margin={{ right: "8px" }}>
        <Button
          onClick={() => props.gotoPage(props.pageIndex + 1)}
          disabled={!canNextPage}
        >
          <PaginationIcon
            src={!canNextPage ? paginationNextDisabledIcon : paginationNextIcon}
            alt={"next_page"}
          />
        </Button>
      </Spacing>
      <Button
        onClick={() => props.gotoPage(props.pageCount - 1)}
        disabled={!canNextPage}
      >
        <PaginationIcon
          src={!canNextPage ? paginationLastDisabledIcon : paginationLastIcon}
          alt={"last_page"}
        />
      </Button>
    </PaginatorContainer>
  );
}

const SelectCustom = styled.select`
  padding: 7px 14px;
`;

const Button = styled.button<any>`
  background-color: ${props => props.theme.color.transparent};
  border: none;

  ${props =>
    !props.disabled &&
    css`
      &:hover {
        background-color: ${props => props.theme.color.primary["100"]};
        border-radius: 5px;
      }
    `}
`;

const PaginationIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const PaginatorContainer = styled(Col)`
  box-shadow: 0 2px 20px rgba(54, 80, 108, 0.1);

  align-items: center;
  background-color: ${props => props.theme.color.grayscale["000"]};
  padding: 20px 16px;
`;