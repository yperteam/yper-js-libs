export declare enum DeliveryParcelFailureReasonEnum {
    weather = "weather",
    receiver_moved = "receiver_moved",
    receiver_canceled_delivery = "receiver_canceled_delivery",
    receiver_absent_contacted = "receiver_absent_contacted",
    receiver_absent_unreachable = "receiver_absent_unreachable",
    receiver_request = "receiver_request",
    receiver_parcel_refused_unknown = "receiver_parcel_refused_unknown",
    receiver_parcel_refused_not_ordered = "receiver_parcel_refused_not_ordered",
    receiver_parcel_refused_damaged = "receiver_parcel_refused_damaged",
    bad_address = "bad_address",
    bad_postal_code = "bad_postal_code",
    bad_street_number = "bad_street_number",
    bad_street = "bad_street",
    delivery_weight_too_high = "delivery_weight_too_high",
    deliverer_workload_too_high = "deliverer_workload_too_high",
    hub_customer_handover = "hub_customer_handover"
}