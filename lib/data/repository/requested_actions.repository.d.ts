import { Term } from "../entity/term.entity";
export declare class RequestedActionsRepository {
    private api;
    getTerm(name: string): Promise<Term>;
    signTerm(props: {
        userId: string;
        term: string;
        version: number;
    }): Promise<string>;
}
