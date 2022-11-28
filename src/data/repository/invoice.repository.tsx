import { Api } from "@yper-script/react/data/provider/http/api";

export class InvoiceRepository {
  private api = new Api();

  public sendEmail(email: string, invoiceIds: string[]): Promise<void> {
    return this.api.emailInvoice(email, invoiceIds);
  }

  public getDownloadInvoice(id: string): Promise<string> {
    return this.api.getDownloadInvoice(id);
  }

  public getDownloadInvoices(ids: string[]): Promise<string> {
    return this.api.getDownloadInvoices(ids);
  }
}
