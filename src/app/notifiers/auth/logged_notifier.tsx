import { atom, CallbackInterface, Loadable } from "recoil";
import { CustomLoadable } from "../../../app/notifiers/custom_loadable";
import { PasswordLogin } from "../../../domain/usecase/auth/password_login";
import { StreamNotifier } from "../stream_notifier";
import { IsLoggedIn } from "../../../domain/usecase/auth/is_logged_in";

export class LoggedNotifier {
  static provider = StreamNotifier.provider<boolean>({
    key: "logged_provider",
    stream: new IsLoggedIn()(),
  });
}
