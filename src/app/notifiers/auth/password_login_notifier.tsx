import { atom, CallbackInterface, Loadable } from "recoil";
import { CustomLoadable } from "../../../app/notifiers/custom_loadable";
import { PasswordLogin } from "../../../domain/usecase/auth/password_login";

export class PasswordLoginNotifier {
  static provider = atom<Loadable<string> | null>({
    key: "password_login_provider",
    default: null,
  });

  static notifier = async (
    username: string,
    password: string,
    callback: CallbackInterface
  ) => {
    callback.set(PasswordLoginNotifier.provider, CustomLoadable.loading);
    const usecase = new PasswordLogin();
    callback.set(
      PasswordLoginNotifier.provider,
      await CustomLoadable.guard(async () => usecase(username, password))
    );
  };
}