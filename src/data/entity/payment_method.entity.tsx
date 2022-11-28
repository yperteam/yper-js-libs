export interface PaymentMethodDetails {
  cardExpMonth?: number;
  cardExpYear?: number;
  mandateUrl?: string;
  lastDigits: string;
}

export interface PaymentMethod {
  id: string;
  primary: boolean;
  type: "card" | "sepa_iban";
  details: PaymentMethodDetails;
}
