import { StatusEnum } from "../enums/StatusEnum";
import { JourneyStatusEnum } from "../enums/journey_status_enum";

export interface ProEntity {
    _id: string;
    billingEmails: string[];
    companyIds: string[];
    companyInfos: {
        address: {
            city: string;
            ctry: string;
            geoCityId: string;
            geoCountryId: string;
            location: {
                coordinates: [number, number];
                type: string;
            };
            street: string;
            streetNumber: string;
            zipCode: string;
        };
        identificationNumber: string;
        name: string;
        owner: {
            email: string;
            firstName: string;
            lastName: string;
            phone: string;
        };
    };
    details: string;
    enabled: boolean;
    formattedAddress: string;
    frozen: null;
    recipients: null;
    restricted: null;
    retailPointIds: string[];
    settings: {
        delivery: {
            p2p_allowed: boolean;
            reverse_allowed: boolean;
        };
        hide_prices: boolean;
        payment_method: string;
        reporting: [];
    };
    stats: {
        ca_month: number;
        ca_year: number;
        favorite_shopper_count: number;
        last_delivery_date: string;
        total_deliveries: number;
        total_deliveries_30d: number;
    };
    status: string;
}

export interface shopper_entity {
    avatar: string;
    firstname: string;
    lastname: string;
    id: string;
    nickname: string;
}

export interface UserEntity {
    avatar: string | null;
    birthdate: string | null;
    created_at: string | null;
    emails:
        | [
              {
                  address: string;
                  primary: boolean;
                  verified: boolean;
                  verified_at: string;
              }
          ]
        | null;
    firstname: string | null;
    gender: string | null;
    is_new: boolean | null;
    last_location: string | null;
    last_login_date: string | null;
    lastname: string | null;
    locked_fields: {
        birthdate: string;
        firstname: string;
        gender: string;
        lastname: string;
        nickname: string;
    } | null;
    nickname: string | null;
    phones:
        | [
              {
                  number: string;
                  prefix: number;
                  primary: boolean;
                  verified: boolean;
                  verified_at: string;
              }
          ]
        | null;
    settings: null | {};
    sponsor_code: null | string;
    user_group_ids: string[] | null;
    username: string | null;
    _id: string | null;
}

export interface AddressTypeEntity {
    type: string | null;
    name: string | null;
    address: AddressEntity;
}

export interface AddressEntity {
    formatted_address: string | null;
    street: string | null;
    street_number: string | number | null;
    additional?: string;
    additional_number?: string;
    zip: number | null;
    city: string | null;
    country: string | null;
    location: {
        type: string;
        coordinates: number[];
    } | null;
}

export interface AdminInvoiceNestedStatsEntity {
    count: number;
    sum_amount: number;
}

export interface AdminInvoiceStatsEntity {
    draft: AdminInvoiceNestedStatsEntity;
    is_late: AdminInvoiceNestedStatsEntity;
    payed: AdminInvoiceNestedStatsEntity;
    processed: AdminInvoiceNestedStatsEntity;
    verification: AdminInvoiceNestedStatsEntity;
}

export interface TicketEntity {
    created_at: string;
    created_by: { id: string; type: string };
    last_update: string;
    status: string;
    subject: { id: string; type: string };
    title: string;
    type: string;
    _id: string;
}

export interface TicketMessageEntity {
    created_at: string;
    created_by: {
        id: string;
        type: string;
    };
    media_ids: string[];
    medias: [
        {
            download_url: string;
            id: string;
        }
    ];
    message: string;
    ticket_id: string;
    _id: string;
}

export interface MediaEntity {
    _id: string;
    upload_url: {
        fields: {
            key: string;
            policy: string;
            "x-amz-algorithm": string;
            "x-amz-credential": string;
            "x-amz-date": string;
            "x-amz-signature": string;
        };
        url: string;
    };
}

export interface DeliveriesStatsEntity {
    deliveriesStats: {
        bookingCanceled: number;
        confirmed: number;
        created: number;
        delivered: number;
        end: number;
        go: number;
        hold: number;
        intent: number;
        is_late: number;
        payment: number;
        paymentTimeout: number;
        pendingCustomerChoice: number;
        picked: number;
        requestCanceled: number;
        returned: number;
        returning: number;
        started: number;
        total: number;
        verified: number;
    };
}

export interface delivery_entity {
    _id: string;
    status: StatusEnum;
    customer: {
        id: string;
    };
    shopper: shopper_entity;
    sender: {
        type: string;
    };
}

export interface parcel_stats_entity {
    all: number;
    delivered: number;
    pending_hub_customer_handover: number;
    pending_provider_return: number;
    ready_for_delivery: number;
    refused: number;
    returned_to_provider: number;
}

export interface journey_stats_entity {
    all: number;
    created: number;
    end: number;
    pending_assignment: number;
    running: number;
}

export interface journey_entity {
    available_at: string;
    current_step: string;
    date_end: string;
    date_start: string;
    deliveries: {};
    estimated_duration: number;
    map_url: string;
    missions_ids: string[];
    optimized: boolean;
    shopper: shopper_entity;
    status: JourneyStatusEnum;
    steps: [];
    total_distance: number;
    total_price: number;
    transport_type: string;
    _id: string;
    provider: string;
}

export interface retail_point_entity {
    _id: string;
    address: {};
    comment: string;
    company_id: string;
    company_name: string;
    delivery_hours: [];
    enabled: boolean;
    logo: string;
    name: string;
    opening_hours: string;
    phone: { private: string; public: string };
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
