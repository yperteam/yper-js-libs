export interface Invoice {
  id: string;
  createdAt: Date;
  number: string;
  payed: boolean;
  payedAt: Date;
  processedAt: Date;
  paymentPending: boolean;
  status: string; // TODO enum ?
  type: string; // TODO enum ?
  sender: InvoiceEntity;
  recipient: InvoiceEntity;
  price: InvoicePrice;
}

interface InvoiceEntity {
  address: {}; // TODO use entity
  id: string;
  identificationNumber: string;
  name: string;
  type: string; // TODO enum
}

interface InvoicePrice {
  ht: number;
  totalDiscount: number;
  totalHt: number;
  totalWithheldTtc: number;
  ttc: number;
  tva: number;
}
