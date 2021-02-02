export enum InvoiceStatusEnum {
    draft = "draft",
    verification = "verification",
    created = "created",
    processed = "processed",
    canceled = "canceled",
}

export enum InvoiceTypeEnum {
    proProvisioning = "proProvisioning",
    proMissions = "proMissions",
    relayed = "relayed",
    shopperNote = "shopperNote",
    shopperPayment = "shopperPayment",
    order = "order",
    credit_note = "credit_note",
}

export enum InvoiceSenderEnum {
    pro = "pro",
    user = "user",
    yper = "yper",
}

export enum InvoiceRecipientEnum {
    pro = InvoiceSenderEnum.pro,
    user = InvoiceSenderEnum.user,
}

export enum RecipientTypeEnum {
    shopper = "shopper",
}
