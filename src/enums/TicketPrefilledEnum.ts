/**
 * TicketPrefilledCategoryEnum used to know distinct category.
 */
export enum TicketPrefilledCategory {
    incorrect_address = "Adresse incorrecte",
    wrong_address = "Adresse eronnée",
    absent = "Destinataire absent",
    wrong_move = "Déplacement inutile du shopper",
    command_not_found = "Commande introuvable",
    unavailable_collection = "Commande indisponible au retrait",
    unreachable = "Destinataire injoignable",
    echec = "Échec de retrait car commande non réglée",
    shopper_unreachable = "Le shopper reste injoignable",
    cancelled_delivery = "Livraison annulée",
    not_done_shopper = "Livraison pas faite par le shopper",
}
