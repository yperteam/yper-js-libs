export class DeliveryCancelHelper {
    public readonly reasons = {
        "pro-reason-shopper-absent": {
            reason: "mission_not_done_shopper",
            profile: "pro",
        },
        "pro-reason-delivery-missing": {
            reason: "order_missing",
            profile: "pro",
        },
        "pro-reason-other": {
            reason: "other",
            profile: "pro",
        },
        "pro-reason-no-shopper-found": {
            reason: "no_shopper_found",
            profile: "pro",
        },
        "pro-reason-delivery-duplicated": {
            reason: "duplicated_delivery",
            profile: "pro",
        },
        "pro-reason-delivery-test": {
            reason: "pro_test",
            profile: "pro",
        },
        "shopper-reason-unavailable": {
            reason: "shopper_unavailable",
            profile: "shopper",
        },
        "shopper-reason-impossible-from-app": {
            reason: "impossible_from_app",
            profile: "shopper",
        },
        "shopper-reason-outside-location": {
            reason: "outside_location",
            profile: "shopper",
        },
        "shopper-reason-other": {
            reason: "other",
            profile: "shopper",
        },
        "shopper-reason-bad-experience": {
            reason: "pro_bad_experience",
            profile: "shopper",
        },
        "shopper-reason-sensitive-delivery": {
            reason: "pro_sensitive_delivery",
            profile: "shopper",
        },
        "shopper-reason-late": {
            reason: "pro_shopper_late",
            profile: "shopper",
        },
    };
}
