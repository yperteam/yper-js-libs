/**
 * StatusEnum used to know distinct mission status (ordered).
 */
export enum StatusEnum {
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
    pendingCustomerChoice = "pendingCustomerChoice",
}

/**
 * StatusTransEnum.
 */
export enum StatusTransEnum {
    created = "non payée",
    intent = "intention",
    payment = "en recherche",
    confirmed = "attribuée",
    started = "en livraison",
    picked = "en livraison",
    go = "en livraison",
    returning = "en retour",
    returned = "en retour",
    delivered = "livrée",
    hold = "livrée",
    verified = "livrée",
    end = "livrée",
    requestCanceled = "annulée",
    bookingCanceled = "annulée",
    paymentTimeout = "délais de paiement dépassé",
    refused = "Refusé",
}
