import { Api } from "../provider/http/api";
import Term from "../entity/term.entity";

export class RequestedActionsRepository {
  private api = new Api();

  public getTerm(name: string): Promise<Term> {
    return this.api.getTerm(name);
  }

  public async signTerm(props: { userId: string, term: string, version: number }): Promise<string> {
    return this.api.acceptTerm(props.userId, props.term, props.version);
  }
}
