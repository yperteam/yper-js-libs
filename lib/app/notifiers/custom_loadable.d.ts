import { Loadable } from "recoil";
export declare class CustomLoadable {
    static loading<T>(): Loadable<T>;
    static guard<T>(f: () => Promise<T>): Promise<Loadable<T>>;
}
