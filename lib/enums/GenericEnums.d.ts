export declare enum CssClass {
    capitalizeFirstLetter = "capitalize-first-letter"
}
export declare enum MessageType {
    email = "email",
    notification = "notifs",
    sms = "sms"
}
export declare enum InvoicesTransEnum {
    processed = "\u00E9mise",
    draft = "\u00E0 approuver"
}
export declare enum ProposalAnswer {
    accepted = "accepted",
    refused = "refused",
    interested = "interested"
}
export declare enum ProposalReason {
    tooFar = "too_far",
    low_earnings = "low_earnings",
    notFree = "not_free",
    freeLater = "free_later",
    other = "other"
}
export declare enum RpEnable {
    enable = "enable",
    disable = "disable"
}
export declare enum SearchPro {
    enable = "enable",
    disable = "disable"
}
export declare enum UserCoordinateType {
    phone = "phone",
    email = "email"
}
export declare enum SearchEngineAlias {
    ALL_ALIAS = "all",
    INVOICE_ALIAS = "invoice",
    MISSION_ALIAS = "mission",
    PRO_ALIAS = "pro",
    RETAIL_POINT_ALIAS = "retailpoint",
    USER_ALIAS = "user"
}
export declare enum UrlAjax {
    patchDelivery = "/ajax/delivery/{0}/patch",
    putRetailPoint = "/ajax/retailpoint/{0}",
    getAdminInvoiceStats = "/ajax/admin/invoice/stats",
    getAdminParcelStats = "/ajax/admin/parcel/stats",
    getAdminJourneyStats = "/ajax/admin/journey/stats",
    postBangDelivery = "/ajax/admin/delivery/{0}/bang",
    getDelivery = "/ajax/deliveries/{0}",
    getDeliveryProposalStats = "/ajax/deliveries/{0}/proposals/stats",
    getDeliveriesStats = "/ajax/deliveries/stats",
    getSearch = "/ajax/search",
    getMissions = "/ajax/missions/table",
    getSearchDeliveries = "/ajax/search/deliveries",
    getSearchPro = "/ajax/search/pro",
    getSearchParcel = "/ajax/search/parcel",
    getSearchJourney = "/ajax/search/journey",
    getSearchUser = "/ajax/search/user",
    getInvoice = "/ajax/invoice/{0}",
    getInvoices = "/ajax/invoices/list",
    getProRetailPoints = "/ajax/pro/{0}/retailpoints",
    getRetailPoint = "/ajax/retailpoint/list",
    getHub = "/ajax/hub/list",
    getTarget = "/ajax/target",
    getPro = "/ajax/pro/list",
    getSpecificTarget = "/ajax/target/{0}",
    postTargetExecute = "/ajax/target/{0}/execute",
    getUser = "/ajax/user",
    postUserAddress = "/ajax/user/{0}/address",
    getUserAddress = "/ajax/user/{0}/address",
    postUserWithdraw = "/ajax/user/{0}/withdraw",
    deleteUserAddress = "/ajax/user/{0}/address/{1}",
    getProposalsTable = "/ajax/proposals/{0}/table",
    getVerificationCount = "/ajax/deliveries/verification/count",
    postAdminCall = "/ajax/admin/call",
    postAddFavoriteShopper = "/ajax/pro/{0}/retailpoint/{1}/like",
    deleteRemoveLike = "/ajax/like/{0}",
    postAcceptShopper = "/ajax/admin/delivery/{0}/shopper",
    postDeliveryCancel = "/ajax/delivery/cancel/{0}",
    postDeliveryForceHold = "/ajax/delivery/{0}/force_hold",
    postDocumentAccept = "/ajax/document/{0}/accept",
    postDocumentRefuse = "/ajax/document/{0}/refuse",
    patchDocument = "/ajax/document/{0}/patch",
    postStatusChange = "/ajax/deliveries/status/change",
    postDeliveriesVerify = "/ajax/deliveries/verify",
    postShiftDelivery = "/ajax/delivery/{0}/shift",
    postNotifyUsers = "/ajax/delivery/{0}/notify",
    postVerifyEmail = "/ajax/user/verify/email",
    postVerifyPhone = "/ajax/user/verify/phone",
    postNewDocument = "/ajax/user/{0}/document/new",
    postSendDeliveryCode = "/ajax/delivery/{0}/send_delivery_code",
    postDocumentImage = "/ajax/user/{0}/document/{1}/upload",
    postSyncWallet = "/ajax/admin/user/{0}/wallet/sync",
    postBlockUser = "/ajax/admin/user/{0}/block",
    postUnblockUser = "/ajax/admin/user/{0}/unblock",
    postShopperStats = "/ajax/admin/user/shopper/stats",
    putUserAddress = "/ajax/user/{0}/address/{1}",
    postUserIban = "/ajax/user/{0}/iban",
    putAdminOnPro = "/ajax/pro/{0}/user",
    deleteUserIban = "/ajax/user/{0}/iban/{1}",
    postUserEmail = "/ajax/user/{0}/email",
    postUserImpersonate = "/ajax/admin/user/{0}/impersonate",
    postSendPasswordResetLink = "/ajax/user/send_password_reset_link",
    deleteUserEmail = "/ajax/user/{0}/email/{1}",
    postUserPhone = "/ajax/user/{0}/phone",
    deleteUserPhone = "/ajax/user/{0}/phone/{1}",
    getDeliveryFinancialWallet = "/ajax/v2/delivery/{0}/financial_wallet",
    pathDeliveryTicket = "/ajax/delivery/{0}/ticket",
    userTicket = "/ajax/user/{0}/ticket",
    pathSendDeliverySummary = "/ajax/delivery/{0}/send_delivery_summary",
    pathTicket = "/ajax/ticket/{0}",
    pathTicketMessage = "/ajax/ticket/{0}/message",
    postMedia = "/ajax/media",
    postConfirmMedia = "/ajax/media/{0}/confirm_media",
    getUserFinancialWallet = "/ajax/v2/user/{0}/financial_wallet",
    postGenerateJourney = "/ajax/hub/{0}/generate_journey",
    postJourneyDeliverer = "/ajax/journey/{0}/deliverer",
    deleteJourneyDeliverer = "/ajax/journey/{0}/deliverer",
    getKycPending = "/ajax/document/kyc_pending",
    getKycStats = "/ajax/document/stats",
    userBlockDeliveries = "/ajax/admin/user/{0}/block_deliveries",
    deleteBlockDeliveries = "/ajax/admin/block_deliveries/{0}"
}
export declare enum ViewUrl {
    deliveryDetails = "delivery/{0}/details",
    rpDetails = "retailpoint/{0}",
    proDetails = "pro/{0}",
    userDetails = "user/{0}/infos",
    invoiceDetail = "invoice/{0}",
    parcelDetail = "parcel/{0}"
}
export declare enum RedirectUrl {
    logout = "/logout"
}
export declare enum FillTarget {
    latitude = "latitude",
    longitude = "longitude"
}
export declare enum ReloadingTimeInterval {
    query = 250,
    query_number = 500,
    verificationCount = 30000,
    pendingKycCount = 30000,
    invoice_page = 30000,
    deliveryHome = 15000,
    proposalDatatable = 15000,
    homeDateFiler = 30000
}
export declare enum TimeIndicatorEnum {
    toasterLifeTime = 5000
}
export declare enum TicketStatus {
    opened = "opened",
    closed = "closed"
}
export declare enum TicketType {
    task = "task",
    problem = "problem",
    incident = "incident"
}
export declare enum MediaType {
    mission_attachment = "mission_attachment",
    ticket_message_attachment = "ticket_message_attachment",
    parcel_attachment = "parcel_attachment"
}
export declare enum ThreadStatus {
    opened = "opened",
    closed = "closed"
}
export declare enum DateFilters {
    yesterday = "<span class='date--deco'>d'hier</span> <i class=\"material-icons rotate\">keyboard_arrow_down</i>",
    today = "<span class='date--deco'>d'aujourd'hui</span> <i class=\"material-icons rotate\">keyboard_arrow_down</i>",
    tomorrow = "<span class='date--deco'>de demain</span> <i class=\"material-icons rotate\">keyboard_arrow_down</i>",
    thisweek = "<span class='date--deco'>de cette semaine</span> <i class=\"material-icons rotate\">keyboard_arrow_down</i>"
}
export declare enum TypeOfCustomer {
    AccountMission = "AccountMission"
}