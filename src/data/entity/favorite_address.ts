import { Address } from "./address.entity";

export interface FavoriteAddress {
  id: string;
  createdAt: string;
  address: Address;
  societyName?: string;
  firstname: string;
  lastname: string;
  phone: string;
  owner: {
    id: string;
    type: string;
  };
  email: string;
  comment?: string;
  lastUsage?: string;
  stats: {
    distance: 0;
    totalDeliveries: 0;
    deliveryPriceHtAverage: 0;
    cartPriceAverage: 0;
  };
}
