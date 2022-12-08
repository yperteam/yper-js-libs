import CallableInstance from "callable-instance";
import { SupportRepository } from "../../../data/repository/support.repository";
import {
  ContactReasonBase,
  FaqArticle,
  MeanOfContact,
} from "../../../data/entity/contact_reason.entity";
import { from, map, Observable } from "rxjs";

export class GetContactReasons extends CallableInstance<
  [],
  Observable<ContactReason[]>
> {
  private repository = new SupportRepository();

  constructor() {
    super("instanceMethod");
  }

  private getUserGroup(): string {
    return process.env.YPER_APP_NAME == "ypershop" ? "pro" : "customer";
  }

  public instanceMethod(): Observable<ContactReason[]> {
    return from(this.repository.getContactReasons([this.getUserGroup()])).pipe(
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
