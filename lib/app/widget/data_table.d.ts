/// <reference types="react" />
import { Loadable } from "recoil";
declare function DataTable<T>(props: {
    columns: any;
    loadable: Loadable<T[]>;
}): JSX.Element;
export default DataTable;
