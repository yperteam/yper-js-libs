import { atom, CallbackInterface, Loadable } from "recoil";
import { CustomLoadable } from "@yper-script/react/app/notifiers/custom_loadable";
import { PasswordLogin } from "@yper-script/react/domain/usecase/auth/password_login";
import { StreamNotifier } from "../stream_notifier";
import { IsLoggedIn } from "@yper-script/react/domain/usecase/auth/is_logged_in";

export class LoggedNotifier {
  static provider = StreamNotifier.provider<boolean>({
    key: "logged_provider",
    stream: new IsLoggedIn()(),
  });
}
