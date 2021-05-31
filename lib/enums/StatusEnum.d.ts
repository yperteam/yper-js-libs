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
    refused = "refused",
    returning = "returning",
    returned = "returned",
    hold = "hold",
    verified = "verified",
    end = "end",
    delivery_failed = "delivery_failed",
    requestCanceled = "requestCanceled",
    bookingCanceled = "bookingCanceled",
    pendingCustomerChoice = "pendingCustomerChoice",
    pendingProviderReturn = "pending_provider_return",
    runningJourneyAssignment = "running_journey_assignment",
    pendingJourneyAssignment = "pending_journey_assignment",
    failedJourneyAssignment = "failed_journey_assignment",
    pendingDelivererAssignment = "pending_deliverer_assignment"
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
    refused = "Refus\u00E9",
    hold = "livr\u00E9e",
    verified = "livr\u00E9e",
    end = "livr\u00E9e",
    delivery_failed = "livraison \u00E9chou\u00E9e",
    requestCanceled = "annul\u00E9e",
    bookingCanceled = "annul\u00E9e",
    paymentTimeout = "d\u00E9lais de paiement d\u00E9pass\u00E9",
    pendingCustomerChoice = "pendingCustomerChoice",
    pendingProviderReturn = "En attente de remise en main propre",
    runningJourneyAssignment = "En cours d'optimisation",
    pendingJourneyAssignment = "affectation de tourn\u00E9e en attente",
    failedJourneyAssignment = "affectation de tourn\u00E9e \u00E9chou\u00E9e",
    pendingDelivererAssignment = "attribution de livraison en attente"
}
