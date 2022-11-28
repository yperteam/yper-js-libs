export interface ProRetailpointStats {
  acceptationDelayAverage: number;
  cartPriceAverage: number;
  delivererOpinionAverage: number;
  delivererOpinionCount: number;
  deliveryPriceHtAverage: number;
  receiverCount: number;
  retailpointOpinionAverage: number;
  retailpointOpinionCount: number;
  totalCanceledWithDelivererDeliveries: number;
  totalDeliveries: number;
  totalDoneDeliveries: number;
}

export interface ProStats {
  acceptationDelayAverage: number;
  cartPriceAverage: number;
  delivererOpinionAverage: number;
  delivererOpinionCount: number;
  deliveriesFromApi: number;
  deliveriesFromYpershop: number;
  deliveriesToday: number;
  deliveryDistanceAverage: number;
  deliveryPriceHtAverage: number;
  receiverCount: number;
  retailpoint?: {
    id: string;
  };
  retailpointOpinionAverage: number;
  retailpointOpinionCount: number;
  totalCanceledWithDelivererDeliveries: number;
  totalDeliveries: number;
  totalDeliveriesToday: number;
  totalDoneDeliveries: number;
  count?: number;
}
