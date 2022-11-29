import { atom } from "recoil";

export enum DelivererErrorEnum {
  dislike = "dislike",
  like = "like",
  deprecate = "deprecate",
}

export class DelivererDialogProvider {
  static dialogDeprecatedProvider = atom({
    key: "deprecate-deliverer-dialog_provider",
    default: { show: false, deliverer: {} },
  });

  static dialogDeprecatedSuccessProvider = atom({
    key: "deprecate-success-deliverer-dialog_provider",
    default: { show: false, delivererName: "" },
  });

  static dialogCancelDeprecatedProvider = atom<boolean>({
    key: "cancel-deprecate-deliverer-dialog_provider",
    default: false,
  });

  static dialogFavoriteProvider = atom({
    key: "favorite-deliverer-dialog_provider",
    default: { show: false, delivererName: "", type: "" },
  });

  static dialogErrorProvider = atom<any>({
    key: "error-dialog_provider",
    default: { show: false, type: "default" },
  });
}
