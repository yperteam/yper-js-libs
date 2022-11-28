import CallableInstance from "callable-instance";
import { RequestedActionsRepository } from "@yper-script/react/data/repository/requested_actions.repository";
import { GetCurrentUserId } from "../get_current_user_id";
import { firstValueFrom } from "rxjs";

export class SignTerm extends CallableInstance<[string], Promise<string>> {
    private repository = new RequestedActionsRepository();
    private getUserId = new GetCurrentUserId();

    constructor() {
        super("instanceMethod");
    }

    public async instanceMethod(termName: string): Promise<string> {
        const term = await this.repository.getTerm(termName);
        const userId = await firstValueFrom(this.getUserId());
        return this.repository.signTerm({ userId: userId, term: termName, version: term.version });
    }
}
