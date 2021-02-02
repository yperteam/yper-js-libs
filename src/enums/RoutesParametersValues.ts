export enum SearchDeliveriesValuesEnum {
    sort = "date__deliveryStart",
    descendingSort = "-date__deliveryStart",
    expand_ticket = "ticket",
}
export enum SearchParcelValuesEnum {
    ascendingSort = "createdAt",
    descendingSort = "-createdAt",
    bigParcelSize = "xl",
}
export enum SearchJourneyValuesEnum {
    ascendingSort = "createdAt",
    descendingSort = "-createdAt",
    bigParcelSize = "xl",
    rider = "rider",
    shopper = "shopper",
}
export enum GetDeliveriesValuesEnum {
    sort = "date.deliveryStart",
}

export enum SearchValuesEnum {
    sort = "createdAt",
    descendingSort = "-createdAt",
}
