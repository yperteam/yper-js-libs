import { InvoiceRepository } from "../../../data/repository/invoice.repository";

export class EmailInvoices {
  private repository: InvoiceRepository = new InvoiceRepository();

  public async call(email: string, invoiceIds: string[]): Promise<void> {
    return this.repository.sendEmail(email, invoiceIds);
  }
}
