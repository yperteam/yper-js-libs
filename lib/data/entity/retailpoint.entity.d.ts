import { Address } from "../../data/entity/address.entity";
import { DeliveryHours } from "../../data/entity/delivery_hours.entity";
import { Rating } from "../../data/entity/rating_details.entity";
import { RetailPointStats } from "../../data/entity/retailpoint_stats";
export interface ProRetailpointList {
    count: {
        current: number;
        total: number;
    };
    data: Retailpoint[];
}
export interface RetailpointSettings {
    maxDeliveryValue?: number;
}
export interface Retailpoint {
    id: string;
    address: Address;
    comment: string;
    companyId: string;
    companyName: string;
    deliveryHours?: DeliveryHours[];
    enabled: boolean;
    logo: string;
    name: string;
    openingHours?: DeliveryHours;
    phone: {
        private: string;
        public: string;
    };
    rating?: number;
    ratingDetails: Rating;
    specialDeliveryDays: [];
    stats: RetailPointStats;
    type: string;
    settings?: RetailpointSettings;
}
