export interface RetailPointStats {
    customerCount: number;
    deliveriesPerCustomer: number;
    deliveriesPerShopper: number;
    favoriteShopperCount: number;
    lastDeliveryDate: Date;
    ratingAverage?: number;
    ratingCount: number;
    serviceAvailabilityColor?: number;
    shopperCount: number;
    totalDeliveries: number;
    totalDeliveries30d: number;
}
