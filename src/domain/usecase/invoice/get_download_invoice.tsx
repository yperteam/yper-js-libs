import { InvoiceRepository } from "@yper-script/react/data/repository/invoice.repository";

export class GetDownloadInvoice {
  private repository: InvoiceRepository = new InvoiceRepository();

  public async call(id: string): Promise<string> {
    return this.repository.getDownloadInvoice(id);
  }
}
