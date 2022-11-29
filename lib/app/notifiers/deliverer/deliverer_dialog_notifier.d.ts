export declare enum DelivererErrorEnum {
    dislike = "dislike",
    like = "like",
    deprecate = "deprecate"
}
export declare class DelivererDialogProvider {
    static dialogDeprecatedProvider: import("recoil").RecoilState<{
        show: boolean;
        deliverer: {};
    }>;
    static dialogDeprecatedSuccessProvider: import("recoil").RecoilState<{
        show: boolean;
        delivererName: string;
    }>;
    static dialogCancelDeprecatedProvider: import("recoil").RecoilState<boolean>;
    static dialogFavoriteProvider: import("recoil").RecoilState<{
        show: boolean;
        delivererName: string;
        type: string;
    }>;
    static dialogErrorProvider: import("recoil").RecoilState<any>;
}
