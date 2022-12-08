import CallableInstance from "callable-instance";
import { RequestedActionsRepository } from "../../../data/repository/requested_actions.repository";
import { WatchCurrentUser } from "../user/watch_current_user";
import { firstValueFrom } from "rxjs";

export class SignTerm extends CallableInstance<[string], Promise<string>> {
    private repository = new RequestedActionsRepository();
    private getUser = new WatchCurrentUser();

    constructor() {
        super("instanceMethod");
    }

    public async instanceMethod(termName: string): Promise<string> {
        const term = await this.repository.getTerm(termName);
        const user = await firstValueFrom(this.getUser());
        return this.repository.signTerm({ userId: user.id, term: termName, version: term.version });
    }
}
