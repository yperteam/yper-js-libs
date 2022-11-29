import { Address } from "./address.entity";
export declare enum MissionClientType {
    retailpoint = "retailpoint",
    user = "user"
}
export interface MissionAddress extends Address {
    favoriteAddressId?: string;
}
export interface MissionClient {
    id?: string;
    address?: MissionAddress;
    avatar?: string;
    firstname?: string;
    lastname?: string;
    businessName?: string;
    phone?: string;
    email?: string;
    type: MissionClientType;
}
export interface PriceSurcharge {
    amount: number;
    canApply: boolean;
    name: string;
}
export interface MissionDistance {
    base: number;
    billed: number;
    real?: number;
}
export interface MissionPrice {
    base: number;
    total: number;
    totalHt: number;
    totalTtc: number;
    tva: number;
    detail: {
        discounts: [];
        surcharges: PriceSurcharge[];
    };
}
export interface Mission {
    id: string;
    comment?: string;
    date: {
        deliveryEnd?: Date;
        deliveryStart?: Date;
    };
    distance: MissionDistance;
    extra: {
        isCeremony: boolean;
        ceremonyDate?: Date;
        nbItems?: number;
        price: number;
    };
    importantComment: string;
    missionTemplate?: {
        id: string;
        name: string;
    };
    options: string[];
    order: {
        id: string;
        idFull: string;
    };
    orderId: string;
    price: MissionPrice;
    pickupAddress: Address;
    receiver: MissionClient;
    sender: MissionClient;
    returnPolicy: ReturnPolicy;
    transportType: TransportType;
    geojsonDirections: GeoJsonDirections;
}
export declare enum ReturnPolicy {
    door = "door",
    back = "back",
    neighbour = "neighbour"
}
export declare enum TransportType {
    foot = "foot",
    moto = "moto",
    bike = "bike",
    car = "car",
    break = "break"
}
export interface GeoJsonDirections {
    coordinates: [number, number][];
    type: string;
}
