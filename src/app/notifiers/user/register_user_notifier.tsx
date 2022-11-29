import { atom, CallbackInterface, Loadable } from "recoil";
import { CustomLoadable } from "../../../app/notifiers/custom_loadable";
import { RegisterUser } from "../../../domain/usecase/user/register_user";
import { RegisterUserProps } from "../../../data/repository/user.repository";

export class RegisterUserNotifier {
    static provider = atom<Loadable<void> | null>({
        key: "register_user_provider",
        default: null,
    });

    static notifier = async (
        props: RegisterUserProps,
        callback: CallbackInterface,
    ) => {
        callback.set(RegisterUserNotifier.provider, CustomLoadable.loading);
        const usecase = new RegisterUser();
        callback.set(
            RegisterUserNotifier.provider,
            await CustomLoadable.guard(async () => usecase(props))
        );
    };
}
