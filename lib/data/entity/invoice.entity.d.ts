export interface Invoice {
    id: string;
    createdAt: Date;
    number: string;
    payed: boolean;
    payedAt: Date;
    processedAt: Date;
    paymentPending: boolean;
    status: string;
    type: string;
    sender: InvoiceEntity;
    recipient: InvoiceEntity;
    price: InvoicePrice;
}
interface InvoiceEntity {
    address: {};
    id: string;
    identificationNumber: string;
    name: string;
    type: string;
}
interface InvoicePrice {
    ht: number;
    totalDiscount: number;
    totalHt: number;
    totalWithheldTtc: number;
    ttc: number;
    tva: number;
}
export {};
