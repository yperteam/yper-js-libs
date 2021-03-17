import {AddressEntity} from "./Entity";

export interface DeliveryAddressEntity extends AddressEntity {
    city_id?: string;
    comment?: string;
    country_id?: string;
    elevator?: boolean;
    entrance_code?: boolean;
    floor?: boolean;
    geohash?: string;
    phone?: string;
}

export interface UserDeliveryEntity {
    avatar?: string
    id: string,
    is_new: boolean,
    firstname: string,
    lastname: string,
    nickname: string,
    phone: string,
    email: string,
    type: string,
}

export interface DeliveryEntity {
    _id: string,
    comment: string,
    customer: UserDeliveryEntity,
    customer_id: string,
    date: { delivery_end: string, delivery_start: string, edition_limit: string, pickup_end: string, pickup_start: string },
    distance: { base: number, billed: number, real: number },
    extra: { custom_data?: {}, force_hold: boolean, is_ceremony: boolean, nb_items: number, price: number, remaining_validation_attempts: number },
    fingerprint: string,
    generated_code: string,
    google_maps: [],
    important_comment: string,
    is_late: boolean,
    mission_template: { id: string, name: string },
    options: [],
    order_id: string,
    order: { id: string, id_full: string },
    pickup_address: null,
    price: { base: number, detail: { discounts: [], surcharges: [] }, total: number, total_ht: number, total_ttc: number, tva: number },
    pro_id: string,
    provider_id: string,
    receiver: { address: DeliveryAddressEntity, business_name: string, email: string, firstname: string, id: string, lastname: string, nickname: string, phone: string, type: string },
    retailpoint_id: string,
    return_policy: string,
    sender: { address: DeliveryAddressEntity, avatar: string, business_name: string, email: string, firstname: string, id: string, lastname: string, nickname: string, phone: string, type: string },
    shopper: UserDeliveryEntity,
    shopper_earnings: { base: number, surcharges: [], total: number },
    status: string,
    status_history: { extra: {}, status: string, userId: string, when: string }[],
    transport_type: string
}