/**
 * StatusEnum used to know distinct mission status (ordered).
 */
export declare enum StatusEnum {
    intent = "intent",
    created = "created",
    payment = "payment",
    paymentTimeout = "paymentTimeout",
    confirmed = "confirmed",
    started = "started",
    picked = "picked",
    go = "go",
    delivered = "delivered",
    returning = "returning",
    returned = "returned",
    hold = "hold",
    verified = "verified",
    end = "end",
    requestCanceled = "requestCanceled",
    bookingCanceled = "bookingCanceled",
    pendingCustomerChoice = "pendingCustomerChoice"
}
/**
 * StatusTransEnum.
 */
export declare enum StatusTransEnum {
    created = "non pay\u00E9e",
    intent = "intention",
    payment = "en recherche",
    confirmed = "attribu\u00E9e",
    started = "en livraison",
    picked = "en livraison",
    go = "en livraison",
    returning = "en retour",
    returned = "en retour",
    delivered = "livr\u00E9e",
    hold = "livr\u00E9e",
    verified = "livr\u00E9e",
    end = "livr\u00E9e",
    requestCanceled = "annul\u00E9e",
    bookingCanceled = "annul\u00E9e",
    paymentTimeout = "d\u00E9lais de paiement d\u00E9pass\u00E9",
    refused = "Refus\u00E9"
}
