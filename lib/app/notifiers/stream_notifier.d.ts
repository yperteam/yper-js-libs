import { Loadable, SerializableParam } from "recoil";
import { Observable } from "rxjs";
export declare class StreamNotifier {
    static provider<T>(props: {
        key: string;
        stream: Observable<T>;
        interval?: Observable<any>;
    }): import("recoil").RecoilState<Loadable<T>>;
    static providerFamily<T, P extends SerializableParam>(props: {
        key: string;
        stream: (param: P) => Observable<T>;
        interval?: Observable<any>;
    }): (param: P) => import("recoil").RecoilState<Loadable<T>>;
}
