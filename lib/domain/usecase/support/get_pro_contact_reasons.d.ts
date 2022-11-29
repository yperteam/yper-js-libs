import CallableInstance from "callable-instance";
import { ContactReasonBase, FaqArticle, MeanOfContact } from "../../../data/entity/contact_reason.entity";
import { Observable } from "rxjs";
export declare class GetProContactReasons extends CallableInstance<[
], Observable<ContactReason[]>> {
    private repository;
    constructor();
    instanceMethod(): Observable<ContactReason[]>;
}
export interface ContactReason extends ContactReasonBase {
    faq: FaqArticle[];
    meansOfContact: MeanOfContact[];
}
