"use strict";
exports.__esModule = true;
exports.TypeOfCustomer = exports.DateFilters = exports.ThreadStatus = exports.MediaType = exports.TicketType = exports.TicketStatus = exports.TimeIndicatorEnum = exports.ReloadingTimeInterval = exports.FillTarget = exports.RedirectUrl = exports.ViewUrl = exports.UrlAjax = exports.SearchEngineAlias = exports.UserCoordinateType = exports.SearchPro = exports.RpEnable = exports.ProposalReason = exports.ProposalAnswer = exports.InvoicesTransEnum = exports.MessageType = exports.CssClass = void 0;
var CssClass;
(function (CssClass) {
    CssClass["capitalizeFirstLetter"] = "capitalize-first-letter";
})(CssClass = exports.CssClass || (exports.CssClass = {}));
var MessageType;
(function (MessageType) {
    MessageType["email"] = "email";
    MessageType["notification"] = "notifs";
    MessageType["sms"] = "sms";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var InvoicesTransEnum;
(function (InvoicesTransEnum) {
    InvoicesTransEnum["processed"] = "\u00E9mise";
    InvoicesTransEnum["draft"] = "\u00E0 approuver";
})(InvoicesTransEnum = exports.InvoicesTransEnum || (exports.InvoicesTransEnum = {}));
var ProposalAnswer;
(function (ProposalAnswer) {
    ProposalAnswer["accepted"] = "accepted";
    ProposalAnswer["refused"] = "refused";
    ProposalAnswer["interested"] = "interested";
})(ProposalAnswer = exports.ProposalAnswer || (exports.ProposalAnswer = {}));
var ProposalReason;
(function (ProposalReason) {
    ProposalReason["tooFar"] = "too_far";
    ProposalReason["low_earnings"] = "low_earnings";
    ProposalReason["notFree"] = "not_free";
    ProposalReason["freeLater"] = "free_later";
    ProposalReason["other"] = "other";
})(ProposalReason = exports.ProposalReason || (exports.ProposalReason = {}));
var RpEnable;
(function (RpEnable) {
    RpEnable["enable"] = "enable";
    RpEnable["disable"] = "disable";
})(RpEnable = exports.RpEnable || (exports.RpEnable = {}));
var SearchPro;
(function (SearchPro) {
    SearchPro["enable"] = "enable";
    SearchPro["disable"] = "disable";
})(SearchPro = exports.SearchPro || (exports.SearchPro = {}));
var UserCoordinateType;
(function (UserCoordinateType) {
    UserCoordinateType["phone"] = "phone";
    UserCoordinateType["email"] = "email";
})(UserCoordinateType = exports.UserCoordinateType || (exports.UserCoordinateType = {}));
var SearchEngineAlias;
(function (SearchEngineAlias) {
    SearchEngineAlias["ALL_ALIAS"] = "all";
    SearchEngineAlias["INVOICE_ALIAS"] = "invoice";
    SearchEngineAlias["MISSION_ALIAS"] = "mission";
    SearchEngineAlias["PRO_ALIAS"] = "pro";
    SearchEngineAlias["RETAIL_POINT_ALIAS"] = "retailpoint";
    SearchEngineAlias["USER_ALIAS"] = "user";
})(SearchEngineAlias = exports.SearchEngineAlias || (exports.SearchEngineAlias = {}));
var UrlAjax;
(function (UrlAjax) {
    UrlAjax["patchDelivery"] = "/ajax/delivery/{0}/patch";
    UrlAjax["putRetailPoint"] = "/ajax/retailpoint/{0}";
    UrlAjax["getAdminInvoiceStats"] = "/ajax/admin/invoice/stats";
    UrlAjax["getAdminParcelStats"] = "/ajax/admin/parcel/stats";
    UrlAjax["getAdminJourneyStats"] = "/ajax/admin/journey/stats";
    UrlAjax["postBangDelivery"] = "/ajax/admin/delivery/{0}/bang";
    UrlAjax["getDelivery"] = "/ajax/deliveries/{0}";
    UrlAjax["getDeliveryProposalStats"] = "/ajax/deliveries/{0}/proposals/stats";
    UrlAjax["getDeliveriesStats"] = "/ajax/deliveries/stats";
    UrlAjax["getSearch"] = "/ajax/search";
    UrlAjax["getMissions"] = "/ajax/missions/table";
    UrlAjax["getSearchDeliveries"] = "/ajax/search/deliveries";
    UrlAjax["getSearchPro"] = "/ajax/search/pro";
    UrlAjax["getSearchParcel"] = "/ajax/search/parcel";
    UrlAjax["getSearchJourney"] = "/ajax/search/journey";
    UrlAjax["getSearchUser"] = "/ajax/search/user";
    UrlAjax["getInvoice"] = "/ajax/invoice/{0}";
    UrlAjax["getInvoices"] = "/ajax/invoices/list";
    UrlAjax["getProRetailPoints"] = "/ajax/pro/{0}/retailpoints";
    UrlAjax["getRetailPoint"] = "/ajax/retailpoint/list";
    UrlAjax["getHub"] = "/ajax/hub/list";
    UrlAjax["getTarget"] = "/ajax/target";
    UrlAjax["getPro"] = "/ajax/pro/list";
    UrlAjax["getSpecificTarget"] = "/ajax/target/{0}";
    UrlAjax["postTargetExecute"] = "/ajax/target/{0}/execute";
    UrlAjax["getUser"] = "/ajax/user";
    UrlAjax["postUserAddress"] = "/ajax/user/{0}/address";
    UrlAjax["getUserAddress"] = "/ajax/user/{0}/address";
    UrlAjax["postUserWithdraw"] = "/ajax/user/{0}/withdraw";
    UrlAjax["deleteUserAddress"] = "/ajax/user/{0}/address/{1}";
    UrlAjax["getProposalsTable"] = "/ajax/proposals/{0}/table";
    UrlAjax["getVerificationCount"] = "/ajax/deliveries/verification/count";
    UrlAjax["postAdminCall"] = "/ajax/admin/call";
    UrlAjax["postAddFavoriteShopper"] = "/ajax/pro/{0}/retailpoint/{1}/like";
    UrlAjax["deleteRemoveLike"] = "/ajax/like/{0}";
    UrlAjax["postAcceptShopper"] = "/ajax/admin/delivery/{0}/shopper";
    UrlAjax["postDeliveryCancel"] = "/ajax/delivery/cancel/{0}";
    UrlAjax["postDeliveryForceHold"] = "/ajax/delivery/{0}/force_hold";
    UrlAjax["postDocumentAccept"] = "/ajax/document/{0}/accept";
    UrlAjax["postDocumentRefuse"] = "/ajax/document/{0}/refuse";
    UrlAjax["patchDocument"] = "/ajax/document/{0}/patch";
    UrlAjax["postStatusChange"] = "/ajax/deliveries/status/change";
    UrlAjax["postDeliveriesVerify"] = "/ajax/deliveries/verify";
    UrlAjax["postShiftDelivery"] = "/ajax/delivery/{0}/shift";
    UrlAjax["postNotifyUsers"] = "/ajax/delivery/{0}/notify";
    UrlAjax["postVerifyEmail"] = "/ajax/user/verify/email";
    UrlAjax["postVerifyPhone"] = "/ajax/user/verify/phone";
    UrlAjax["postNewDocument"] = "/ajax/user/{0}/document/new";
    UrlAjax["postSendDeliveryCode"] = "/ajax/delivery/{0}/send_delivery_code";
    UrlAjax["postDocumentImage"] = "/ajax/user/{0}/document/{1}/upload";
    UrlAjax["postSyncWallet"] = "/ajax/admin/user/{0}/wallet/sync";
    UrlAjax["postBlockUser"] = "/ajax/admin/user/{0}/block";
    UrlAjax["postUnblockUser"] = "/ajax/admin/user/{0}/unblock";
    UrlAjax["postShopperStats"] = "/ajax/admin/user/shopper/stats";
    UrlAjax["putUserAddress"] = "/ajax/user/{0}/address/{1}";
    UrlAjax["postUserIban"] = "/ajax/user/{0}/iban";
    UrlAjax["putAdminOnPro"] = "/ajax/pro/{0}/user";
    UrlAjax["deleteUserIban"] = "/ajax/user/{0}/iban/{1}";
    UrlAjax["postUserEmail"] = "/ajax/user/{0}/email";
    UrlAjax["postUserImpersonate"] = "/ajax/admin/user/{0}/impersonate";
    UrlAjax["postSendPasswordResetLink"] = "/ajax/user/send_password_reset_link";
    UrlAjax["deleteUserEmail"] = "/ajax/user/{0}/email/{1}";
    UrlAjax["postUserPhone"] = "/ajax/user/{0}/phone";
    UrlAjax["deleteUserPhone"] = "/ajax/user/{0}/phone/{1}";
    UrlAjax["getDeliveryFinancialWallet"] = "/ajax/v2/delivery/{0}/financial_wallet";
    UrlAjax["pathDeliveryTicket"] = "/ajax/delivery/{0}/ticket";
    UrlAjax["userTicket"] = "/ajax/user/{0}/ticket";
    UrlAjax["pathSendDeliverySummary"] = "/ajax/delivery/{0}/send_delivery_summary";
    UrlAjax["pathTicket"] = "/ajax/ticket/{0}";
    UrlAjax["pathTicketMessage"] = "/ajax/ticket/{0}/message";
    UrlAjax["postMedia"] = "/ajax/media";
    UrlAjax["postConfirmMedia"] = "/ajax/media/{0}/confirm_media";
    UrlAjax["getUserFinancialWallet"] = "/ajax/v2/user/{0}/financial_wallet";
    UrlAjax["postGenerateJourney"] = "/ajax/hub/{0}/generate_journey";
    UrlAjax["postJourneyDeliverer"] = "/ajax/journey/{0}/deliverer";
    UrlAjax["deleteJourneyDeliverer"] = "/ajax/journey/{0}/deliverer";
    UrlAjax["getKycPending"] = "/ajax/document/kyc_pending";
    UrlAjax["getKycStats"] = "/ajax/document/stats";
    UrlAjax["userBlockDeliveries"] = "/ajax/admin/user/{0}/block_deliveries";
    UrlAjax["deleteBlockDeliveries"] = "/ajax/admin/block_deliveries/{0}";
})(UrlAjax = exports.UrlAjax || (exports.UrlAjax = {}));
var ViewUrl;
(function (ViewUrl) {
    ViewUrl["deliveryDetails"] = "delivery/{0}/details";
    ViewUrl["rpDetails"] = "retailpoint/{0}";
    ViewUrl["proDetails"] = "pro/{0}";
    ViewUrl["userDetails"] = "user/{0}/infos";
    ViewUrl["invoiceDetail"] = "invoice/{0}";
    ViewUrl["parcelDetail"] = "parcel/{0}";
})(ViewUrl = exports.ViewUrl || (exports.ViewUrl = {}));
var RedirectUrl;
(function (RedirectUrl) {
    RedirectUrl["logout"] = "/logout";
})(RedirectUrl = exports.RedirectUrl || (exports.RedirectUrl = {}));
var FillTarget;
(function (FillTarget) {
    FillTarget["latitude"] = "latitude";
    FillTarget["longitude"] = "longitude";
})(FillTarget = exports.FillTarget || (exports.FillTarget = {}));
var ReloadingTimeInterval;
(function (ReloadingTimeInterval) {
    ReloadingTimeInterval[ReloadingTimeInterval["query"] = 250] = "query";
    ReloadingTimeInterval[ReloadingTimeInterval["query_number"] = 500] = "query_number";
    ReloadingTimeInterval[ReloadingTimeInterval["verificationCount"] = 30000] = "verificationCount";
    ReloadingTimeInterval[ReloadingTimeInterval["pendingKycCount"] = 30000] = "pendingKycCount";
    ReloadingTimeInterval[ReloadingTimeInterval["invoice_page"] = 30000] = "invoice_page";
    ReloadingTimeInterval[ReloadingTimeInterval["deliveryHome"] = 15000] = "deliveryHome";
    ReloadingTimeInterval[ReloadingTimeInterval["proposalDatatable"] = 15000] = "proposalDatatable";
    ReloadingTimeInterval[ReloadingTimeInterval["homeDateFiler"] = 30000] = "homeDateFiler";
})(ReloadingTimeInterval = exports.ReloadingTimeInterval || (exports.ReloadingTimeInterval = {}));
var TimeIndicatorEnum;
(function (TimeIndicatorEnum) {
    TimeIndicatorEnum[TimeIndicatorEnum["toasterLifeTime"] = 5000] = "toasterLifeTime";
})(TimeIndicatorEnum = exports.TimeIndicatorEnum || (exports.TimeIndicatorEnum = {}));
var TicketStatus;
(function (TicketStatus) {
    TicketStatus["opened"] = "opened";
    TicketStatus["closed"] = "closed";
})(TicketStatus = exports.TicketStatus || (exports.TicketStatus = {}));
var TicketType;
(function (TicketType) {
    TicketType["task"] = "task";
    TicketType["problem"] = "problem";
    TicketType["incident"] = "incident";
})(TicketType = exports.TicketType || (exports.TicketType = {}));
var MediaType;
(function (MediaType) {
    MediaType["mission_attachment"] = "mission_attachment";
    MediaType["ticket_message_attachment"] = "ticket_message_attachment";
    MediaType["parcel_attachment"] = "parcel_attachment";
})(MediaType = exports.MediaType || (exports.MediaType = {}));
var ThreadStatus;
(function (ThreadStatus) {
    ThreadStatus["opened"] = "opened";
    ThreadStatus["closed"] = "closed";
})(ThreadStatus = exports.ThreadStatus || (exports.ThreadStatus = {}));
var DateFilters;
(function (DateFilters) {
    DateFilters["yesterday"] = "<span class='date--deco'>d'hier</span> <i class=\"material-icons rotate\">keyboard_arrow_down</i>";
    DateFilters["today"] = "<span class='date--deco'>d'aujourd'hui</span> <i class=\"material-icons rotate\">keyboard_arrow_down</i>";
    DateFilters["tomorrow"] = "<span class='date--deco'>de demain</span> <i class=\"material-icons rotate\">keyboard_arrow_down</i>";
    DateFilters["thisweek"] = "<span class='date--deco'>de cette semaine</span> <i class=\"material-icons rotate\">keyboard_arrow_down</i>";
})(DateFilters = exports.DateFilters || (exports.DateFilters = {}));
var TypeOfCustomer;
(function (TypeOfCustomer) {
    TypeOfCustomer["AccountMission"] = "AccountMission";
})(TypeOfCustomer = exports.TypeOfCustomer || (exports.TypeOfCustomer = {}));
