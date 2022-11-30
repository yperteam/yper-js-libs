/// <reference types="react" />
interface PaginatorProps {
    contentLength: number;
    pageSize: number;
    setPageSize: Function;
    pageIndex: number;
    gotoPage: Function;
    pageCount: number;
}
export declare function Paginator(props: PaginatorProps): JSX.Element;
export {};
