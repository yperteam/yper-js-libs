/// <reference types="react" />
import { Loadable } from "recoil";
export declare function DataTable<T>(props: {
    columns: any;
    loadable: Loadable<T[]>;
}): JSX.Element;
