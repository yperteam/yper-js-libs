import { InvoiceRepository } from "../../../data/repository/invoice.repository";

export class GetDownloadInvoices {
  private repository: InvoiceRepository = new InvoiceRepository();

  public async call(ids: string[]): Promise<string> {
    return this.repository.getDownloadInvoices(ids);
  }
}
