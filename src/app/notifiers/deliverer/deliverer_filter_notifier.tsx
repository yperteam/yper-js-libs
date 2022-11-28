import { atom } from "recoil";

export enum DelivererFilterEnum {
  last = "last",
  top = "top",
  favorite = "favorite",
}

export class DelivererFilterNotifier {
  static provider = atom<string>({
    key: "deliverer_filter_provider",
    default: DelivererFilterEnum.last,
  });
}
