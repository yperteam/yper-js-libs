import { GetCurrentProId } from "@yper-script/react/domain/usecase/get_current_pro_id";
import { OrderRepository } from "@yper-script/react/data/repository/order.repository";
import { Order } from "@yper-script/react/data/entity/order.entity";
import { InvoiceRepository } from "@yper-script/react/data/repository/invoice.repository";

export class EmailInvoices {
  private repository: InvoiceRepository = new InvoiceRepository();

  public async call(email: string, invoiceIds: string[]): Promise<void> {
    return this.repository.sendEmail(email, invoiceIds);
  }
}
