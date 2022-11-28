import { Address } from "@yper-script/react/data/entity/address.entity";
import { DeliveryHours } from "@yper-script/react/data/entity/delivery_hours.entity";
import { Rating } from "@yper-script/react/data/entity/rating_details.entity";
import { RetailPointStats } from "@yper-script/react/data/entity/retailpoint_stats";

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
