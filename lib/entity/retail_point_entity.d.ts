import { AddressEntity } from "./Entity";
export interface RetailPointAddressEntity extends AddressEntity {
    apartment?: string;
    city_id?: string;
    country_id?: string;
    elevator?: boolean;
    floor?: string;
    geohash?: string;
    comment?: string;
    entrance_code?: string;
    phone?: string;
}
export interface RetailPointEntity {
    _id: string;
    address: RetailPointAddressEntity;
    comment: string;
    company_id: string;
    company_name: string;
    delivery_hours: [
        {
            day: number;
            hours: {
                start: string;
                end: string;
            };
        }
    ];
    enabled: boolean;
    logo: string;
    name: string;
    opening_hours: string;
    phone: {
        private: string;
        public: string;
    };
    rating: number;
    rating_details: {};
    special_delivery_days: [];
    stats: {
        customer_count: number;
        deliveries_per_customer: number;
        deliveries_per_shopper: number;
        favorite_shopper_count: number;
        last_delivery_date: string;
    };
    type: string;
}
