import { atom } from "recoil";

export class ErrorModalNotifier {
  static dialogProvider = atom<any>({
    key: "error_modal_provider",
    default: { display: false },
  });
}
