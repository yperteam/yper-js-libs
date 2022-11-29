export declare class InvoiceRepository {
    private api;
    sendEmail(email: string, invoiceIds: string[]): Promise<void>;
    getDownloadInvoice(id: string): Promise<string>;
    getDownloadInvoices(ids: string[]): Promise<string>;
}
