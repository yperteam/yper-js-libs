export interface Order {
    id: string;
    amount_received: number;
    items: Item[];
    left_to_pay: number;
    mission_ids: string[];
    payment_intents: [];
    price: Price;
    status: string;
}
export interface Item {
    id: string;
    type: string;
    details: {
        costs: {
            discounts: [];
            surcharges: [];
        };
        price: {
            base: null;
            detail: {
                discounts: [];
                surcharges: [];
            };
            totalHt: number;
            totalTtc: number;
            tva: number;
        };
    };
    price: {
        priceHt: 0;
        totalHt: 0;
        tva: 0;
    };
}
export interface Price {
    discount: number;
    discounts: [];
    length: number;
    priceHt: number;
    totalDiscount: number;
    totalHt: number;
    tva: number;
}
