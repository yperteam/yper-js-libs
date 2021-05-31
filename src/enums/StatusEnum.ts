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
    pendingDelivererAssignment = "pending_deliverer_assignment",
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
    refused = "Refusé",
    hold = "livrée",
    verified = "livrée",
    end = "livrée",
    delivery_failed = "livraison échouée",
    requestCanceled = "annulée",
    bookingCanceled = "annulée",
    paymentTimeout = "délais de paiement dépassé",
    pendingCustomerChoice = "pendingCustomerChoice",
    pendingProviderReturn = "En attente de remise en main propre",
    runningJourneyAssignment = "En cours d'optimisation",
    pendingJourneyAssignment = "affectation de tournée en attente",
    failedJourneyAssignment = "affectation de tournée échouée",
    pendingDelivererAssignment = "attribution de livraison en attente",
}
