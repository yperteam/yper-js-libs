import { FavoriteAddress } from "../../../data/entity/favorite_address";
export declare class FavoriteAddressNotifier {
    static provider: import("recoil").RecoilState<import("recoil").Loadable<FavoriteAddress[]>>;
    static repertoryDetailProvider: (param: string) => import("recoil").RecoilValueReadOnly<FavoriteAddress>;
    static selectedId: import("recoil").RecoilState<string>;
}
