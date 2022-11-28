import { atom, atomFamily } from "recoil";

export class PaymentNotifier {
  static dialogProvider = atom<boolean>({
    key: "payment-dialog-provider",
    default: false,
  });

  static successDialogProvider = atom<boolean>({
    key: "success-dialog-provider",
    default: false,
  });

  static deleteDialogProvider = atom<boolean>({
    key: "delete-dialog-provider",
    default: false,
  });

  static downgradeDialogProvider = atom<boolean>({
    key: "downgrade-dialog-provider",
    default: false,
  });
}
