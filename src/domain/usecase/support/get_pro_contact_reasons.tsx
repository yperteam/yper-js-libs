import CallableInstance from "callable-instance";
import { SupportRepository } from "../../../data/repository/support.repository";
import {
  ContactReasonBase,
  FaqArticle,
  MeanOfContact,
} from "../../../data/entity/contact_reason.entity";
import { from, map, Observable } from "rxjs";

export class GetProContactReasons extends CallableInstance<
  [],
  Observable<ContactReason[]>
> {
  private repository = new SupportRepository();

  constructor() {
    super("instanceMethod");
  }

  public instanceMethod(): Observable<ContactReason[]> {
    // TODO base it on current app
    return from(this.repository.getContactReasons(["pro"])).pipe(
      map(l =>
        l.map(e => ({
          ...e,
          faq: [
            ...(e.faq.customer || []),
            ...(e.faq.pro || []),
            ...(e.faq.shopper || []),
          ],
          meansOfContact: [
            ...(e.meansOfContact.customer || []),
            ...(e.meansOfContact.pro || []),
            ...(e.meansOfContact.shopper || []),
          ],
        }))
      )
    );
  }
}

export interface ContactReason extends ContactReasonBase {
  faq: FaqArticle[];
  meansOfContact: MeanOfContact[];
}
