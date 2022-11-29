export declare class EmailInvoices {
    private repository;
    call(email: string, invoiceIds: string[]): Promise<void>;
}
