import { StreamNotifier } from "../stream_notifier";
import { User } from "../../../data/entity/user.entity";
import { GetCurrentUser } from "../../../domain/usecase/user/get_current_user";

export class CurrentUserNotifier {
    static provider = StreamNotifier.provider<User>({
        key: "get-current-user-provider",
        stream: new GetCurrentUser()(),
    });
}
