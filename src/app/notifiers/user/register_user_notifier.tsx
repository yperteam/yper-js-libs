import { atom, CallbackInterface, Loadable } from "recoil";
import { CustomLoadable } from "@yper-script/react/app/notifiers/custom_loadable";
import { RegisterUser } from "@yper-script/react/domain/usecase/user/register_user";
import { UserSex } from "@yper-script/react/data/entity/user.entity";
import { RegisterUserProps } from "@yper-script/react/data/repository/user.repository";

export class RegisterUserNotifier {
    static provider = atom<Loadable<void>>({
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
