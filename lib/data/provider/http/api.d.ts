import { ProSubscription } from "../../../data/entity/subscription.entity";
import { ProRetailpointStats, ProStats } from "../../../data/entity/pro_retailpoint_stats.entity";
import { StatsInterval } from "../../../data/entity/stats_interval.enum";
import { DatedStatNumber } from "../../../domain/model/dated_stat_number";
import { ProRetailpointList } from "../../../data/entity/retailpoint.entity";
import { PaginatedResult } from "./paginated_result";
import { Invoice } from "../../../data/entity/invoice.entity";
import { OrderItem } from "../../../data/entity/order_item";
import { Order } from "../../../data/entity/order.entity";
import { MissionTemplate } from "../../../data/entity/mission_template.entity";
import { SubscriptionPreview } from "../../../data/entity/subscription_preview.entity";
import { PaymentMethod } from "../../../data/entity/payment_method.entity";
import { Pro } from "../../../data/entity/pro.entity";
import { BlockedDeliverer, ProBlockedDeliverer, ProDeliverer, ProFavoriteDeliverer } from "../../../data/entity/pro_deliverer.entity";
import { MissionAddress, MissionClient, MissionDistance, MissionPrice, ReturnPolicy, TransportType } from "../../../data/entity/mission.entity";
import { SocietyRegistry } from "../../../data/entity/society_registry.entity";
import { Society } from "../../../data/entity/society.entity";
import { SocietyRequestParams } from "../../repository/society.repository";
import { NotificationResponse, NotificationUnreadResponse } from "../../../data/entity/notification.entity";
import { FavoriteAddress } from "../../entity/favorite_address";
import { ContactReasonEntity } from "../../entity/contact_reason.entity";
import { PhoneCallRequest } from "../../entity/phone_call_request.entity";
import { User, UserSex } from "../../entity/user.entity";
import { Term } from "../../../data/entity/term.entity";
import { ProLimit } from "../../../data/entity/pro_limit.entity";
export declare abstract class Singleton {
    private static instance;
    constructor();
}
export declare class Api extends Singleton {
    private api;
    isoDateFormat: RegExp;
    isIsoDateString(value: any): boolean;
    handleDates(body: any): any;
    constructor();
    getPro(id: string): Promise<Pro>;
    getProInvoice(proId: string, limit: number, dateStart: Date, dateEnd: Date): Promise<PaginatedResult<Invoice>>;
    getProSubscription(id: string, valid: boolean): Promise<ProSubscription[]>;
    getProRetailpointStats(proId: string, rpId: string, begin: Date, end: Date): Promise<ProRetailpointStats>;
    getRetailointCatchmentsArea(proId: string, rpId: string, begin: Date, end: Date, distance_interval: number, min: number, max: number): Promise<number[]>;
    getRetailointDeliveryDistribution(proId: string, rpId: string, begin: Date, end: Date, interval: StatsInterval): Promise<DatedStatNumber[]>;
    getRetailointCartPrice(proId: string, rpId: string, begin: Date, end: Date, interval: StatsInterval): Promise<DatedStatNumber[]>;
    getProStats(proId: string, begin: Date, end: Date, retailpointsIds: string[]): Promise<ProRetailpointStats>;
    getProRetailsPointsStats(proId: string, retailpointsIds: string[], begin: Date, end: Date): Promise<ProStats[]>;
    getDownloadInvoice(id: string): Promise<string>;
    getDownloadInvoices(ids: string[]): Promise<string>;
    getOrder(orderId: string): Promise<Order>;
    createOrder(proId: string, items?: OrderItem[]): Promise<Order>;
    getProRetailPoints(proId: string): Promise<ProRetailpointList>;
    validateOrder(orderId: string): Promise<Order>;
    emailInvoice(email: string, invoiceIds: string[]): Promise<void>;
    getRetailPointMissionTemplates(proId: string, rpId: string): Promise<MissionTemplate[]>;
    getProMissionTemplates(proId: string): Promise<MissionTemplate[]>;
    getPrebook(proId: string, prebookId: string): Promise<any>;
    private removeEmpty;
    updatePrebook(proId: string, prebookId: string, orderId: string, orderName: string, receiver: MissionClient, sender: MissionClient, receiverAddress?: MissionAddress, senderAddress?: MissionAddress, options?: string[], templateId?: string, price?: number, itemsNb?: number, transportType?: TransportType, returnPolicy?: ReturnPolicy, deliveryStart?: Date, deliveryEnd?: Date, ceremonyDate?: Date, comment?: string): Promise<PrebookChanges>;
    addProSubscription(proId: string, subscription: string, billingPeriod: string): Promise<any>;
    editProSubscription(proId: string, subscription: string, billingPeriod: string): Promise<SubscriptionPreview>;
    previewProSubscription(proId: string, subscription: string, billingPeriod: string): Promise<SubscriptionPreview>;
    cancelProSubscription(id: string): Promise<SubscriptionPreview>;
    addProCard(proId: string): Promise<any>;
    addProIban(proId: string): Promise<ClientDetails>;
    getProPaymentMethods(proId: string, paymentType?: string): Promise<PaymentMethod[]>;
    setPrimaryPaymentMethod(proId: string, methodId: string): Promise<void>;
    deletePaymentMethod(proId: string, methodId: string): Promise<void>;
    getProLimit(proId: string): Promise<ProLimit>;
    getDeliverer(proId: string, filter: string): Promise<ProDeliverer[]>;
    getFavoriteDeliverers(proId: string, rpId: string): Promise<ProFavoriteDeliverer[]>;
    getBlockedDeliverers(proId: string): Promise<ProBlockedDeliverer>;
    deprecateShopper(proId: string, delivererId: string): Promise<BlockedDeliverer>;
    dislikeShopper(proId: string, retailPointId: string, likeId: string): Promise<any>;
    likeShopper(proId: string, retailPointId: string, delivererId: string, delivererType: string): Promise<ProFavoriteDeliverer>;
    payOrder(orderId: string, methodId: string): Promise<Order>;
    searchSocietyRegistry(registryNumber: string): Promise<SocietyRegistry>;
    putSociety(societyId: string, society: SocietyRequestParams): Promise<Society>;
    getNotifications(userId: string, retailpointId: string, skip: number, limit: number): Promise<NotificationResponse>;
    postReadNotification(userId: string, notificationId: string): Promise<void>;
    postReadAllNotifications(userId: string, retailpointId: string): Promise<void>;
    getUnreadNotificationNumber(userId: string, retailpointId: string): Promise<NotificationUnreadResponse>;
    resetProSecret(proId: string): Promise<Object>;
    getProFavoriteAddress(proId: string, retailpointId: string, limit: number): Promise<PaginatedResult<FavoriteAddress>>;
    createProFavoriteAddress(client: MissionClient, owner: FavoriteAddressOwner, about: FavoriteAddressOwner): Promise<FavoriteAddress>;
    getSupportContactReasons(userGroups: string[]): Promise<ContactReasonEntity[]>;
    getPhoneCallRequests(userId: string, status: string[], callerType: string): Promise<any>;
    getPhoneCallRequest(requestId: string): Promise<any>;
    cancelPhoneCallRequest(requestId: string): Promise<any>;
    requestPhoneCall(props: {
        callerId: string;
        phoneNumber: string;
        reasonId: string;
        callerType: string;
        comment?: string;
    }): Promise<PhoneCallRequest>;
    login(props: {
        grantType: "password" | "client_credentials";
        appId: string;
        appSecret: string;
        refreshToken?: string;
        username?: string;
        password?: string;
    }): Promise<string>;
    registerUser(props: {
        firstname: string;
        lastname: string;
        phone: string;
        email: string;
        password: string;
        birthDate: Date;
        sex: UserSex;
    }): Promise<any>;
    getTerm(termName: string): Promise<Term>;
    acceptTerm(userId: string, term: string, version: number): Promise<any>;
    getCurrentUser(): Promise<User>;
}
export interface ClientDetails {
    stripeDetails: {
        clientPrivateKey: string;
    };
}
export interface PriceDetail {
    name: string;
    amount: number;
}
export interface PrebookChanges {
    price: MissionPrice;
    distance: MissionDistance;
}
export interface FavoriteAddressOwner {
    id: string;
    type: "retail_point" | "pro";
}
