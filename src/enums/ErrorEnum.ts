export enum ErrorCodeEnum {
    server_error = 500,
}

export enum ErrorEnum {
    INVALID_DATE = "invalid_date",
    INVALID_ACCESS = "invalid_access",
    INVALID_PHONE = "invalid_phone_number",
    INVALID_EMAIL = "invalid_email",
    INVALID_IBAN = "invalid_iban",
    MISSION_NOT_AVAILABLE = "mission_not_available",
    MISSION_NOT_CANCELABLE = "mission_not_cancelable",
    USER_NOT_FOUND = "user_not_found",
}

export enum TicketErrorEnum {
    MEDIA_NOT_SEND = "Firstly, you need to push file with a comment before uploading another media.",
}

export enum ToasterErrorApiTitle {
    generic_error_title = "Une erreur est survenue",
}

export enum ToasterErrorApiMessage {
    generic_error_message = "L'action n'a pas pu être effectuée.",
    error_message_call = "L’appel a échoué. Vous devez être en ligne sur Aircall pour pouvoir l’effectuer.",
    error_message_create_phone = "Le numéro saisit est soit incomplet, soit déjà utilisé par un utilisateur",
    error_message_create_email = "Le mail saisit est soit incomplet, soit déjà utilisé par un utilisateur",
    error_message_create_iban = "L'IBAN saisi est incorrecte",
    error_invalid_date = "Vérifiez la date renseignée car vous ne pouvez pas passer de livraison pour une heure antérieure à maintenant",
    error_not_cancellable = "La livraison n'est plus modifiable",
}

export enum WithdrawShopperError {
    not_between_amounts = "Saisissez un montant entre 1 € et 1000 €",
    higher_withdrawal_amount = "Le montant du retrait est supérieur au solde disponible",
    absent_withdrawal_amount = "Renseignez un montant pour pouvoir continuer",
}
