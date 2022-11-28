import { InvoiceRepository } from "@yper-script/react/data/repository/invoice.repository";

export class GetDownloadInvoices {
  private repository: InvoiceRepository = new InvoiceRepository();

  public async call(ids: string[]): Promise<string> {
    return this.repository.getDownloadInvoices(ids);
  }
}
