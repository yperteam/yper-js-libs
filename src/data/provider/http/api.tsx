import { ProSubscription } from "../../../data/entity/subscription.entity";
import { AuthStorage } from "../../../data/provider/local/auth_storage";
import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";
import {
  ProRetailpointStats,
  ProStats,
} from "../../../data/entity/pro_retailpoint_stats.entity";
import { StatsInterval } from "../../../data/entity/stats_interval.enum";
import DatedStatNumber from "../../../domain/model/dated_stat_number";
import { ProRetailpointList } from "../../../data/entity/retailpoint.entity";
import { PaginatedResult } from "./paginated_result";
import { Invoice } from "../../../data/entity/invoice.entity";
import { OrderItem } from "../../../data/entity/order_item";
import { Order } from "../../../data/entity/order.entity";
import { MissionTemplate } from "../../../data/entity/mission_template.entity";
import { Address } from "../../../data/entity/address.entity";
import { SubscriptionPreview } from "../../../data/entity/subscription_preview.entity";
import { PaymentMethod } from "../../../data/entity/payment_method.entity";
import { Pro } from "../../../data/entity/pro.entity";
import {
  BlockedDeliverer,
  ProBlockedDeliverer,
  ProDeliverer,
  ProFavoriteDeliverer,
} from "../../../data/entity/pro_deliverer.entity";
import {
  MissionAddress,
  MissionClient,
  MissionClientType,
  MissionDistance,
  MissionPrice,
  ReturnPolicy,
  TransportType,
} from "../../../data/entity/mission.entity";
import { SocietyRegistry } from "../../../data/entity/society_registry.entity";
import { Society } from "../../../data/entity/society.entity";
import { SocietyRequestParams } from "../../repository/society.repository";
import {
  NotificationResponse,
  NotificationUnreadResponse,
} from "../../../data/entity/notification.entity";
import { FavoriteAddress } from "../../entity/favorite_address";
import { ContactReasonEntity } from "../../entity/contact_reason.entity";
import { PhoneCallRequest } from "../../entity/phone_call_request.entity";
import { firstValueFrom } from "rxjs";
import { UserSex } from "../../entity/user.entity";
import Term from "../../../data/entity/term.entity";
import { ProLimit } from "../../../data/entity/pro_limit.entity";

export abstract class Singleton {
  private static instance: Singleton;

  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }

    Singleton.instance = this;
  }
}

const baseUrl: string = process.env.YPER_YPERAPI_URL;
const APP_NAME = "ypershop";

export class Api extends Singleton {
  private api = axios.create({
    baseURL: baseUrl,
    transitional: {
      silentJSONParsing: false,
    },
  });

  isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?/;

  isIsoDateString(value: any): boolean {
    return value && typeof value === "string" && this.isoDateFormat.test(value);
  }

  handleDates(body: any) {
    if (body === null || body === undefined || typeof body !== "object")
      return body;

    for (const key of Object.keys(body)) {
      const value = body[key];

      if (this.isIsoDateString(value)) {
        body[key] = new Date(this.isoDateFormat.exec(value)[0]);
      } else if (typeof value === "object") this.handleDates(value);
    }
  }

  constructor() {
    super();
    applyCaseMiddleware(this.api, {
      caseMiddleware: {
        requestInterceptor: config => {
          return config;
        },
      },
    });
    this.api.interceptors.request.use(async config => {
      const authHeader = config.headers["Authorization"];
      if (authHeader == "credentials") {
        // TODO store it ?
        const credentialToken = await this.login({
          grantType: "client_credentials",
          appId: process.env.YPER_YPERAPI_CLIENT_ID,
          appSecret: process.env.YPER_YPERAPI_CLIENT_SECRET,
        });
        config.headers["Authorization"] = `Bearer ${credentialToken}`;
      } else if (authHeader != "none") {
        config.headers["Authorization"] = `Bearer ${await firstValueFrom(
          AuthStorage.instance.get()
        )}`;
      }
      config.headers["X-Request-Timestamp"] = new Date().getTime().toString();
      return config;
    });
    this.api.interceptors.response.use(
      response => {
        this.handleDates(response.data);
        return response;
      },
      error => {
        throw error?.response?.data;
      }
    );
  }

  public async getPro(id: string): Promise<Pro> {
    const res = await this.api.get(`/pro/${id}`);
    const countryValue =
      res.data.result.companyInfos.address.ctry ||
      res.data.result.companyInfos.address.country;
    const zipValue =
      res.data.result.companyInfos.address.zipCode ||
      res.data.result.companyInfos.address.zip;
    const formattedCountry =
      countryValue === "FR" || countryValue === "FRA" ? "France" : countryValue;
    const formattedResult = {
      ...res.data.result,
      companyInfos: {
        ...res.data.result.companyInfos,
        address: {
          ...res.data.result.companyInfos.address,
          zip: zipValue,
          country: formattedCountry,
          formattedAddress: `${res.data.result.companyInfos.address.streetNumber} ${res.data.result.companyInfos.address.street}, ${res.data.result.companyInfos.address.city}, ${formattedCountry}`,
        },
      },
    };
    delete formattedResult.companyInfos.address.ctry;
    delete formattedResult.companyInfos.address.zipCode;
    return formattedResult;
  }

  public async getProInvoice(
    proId: string,
    limit: number,
    dateStart: Date,
    dateEnd: Date
  ): Promise<PaginatedResult<Invoice>> {
    let res = await this.api.get(`invoice`, {
      params: {
        recipient_id: proId,
        limit: limit,
        start_date: dateStart,
        end_date: dateEnd,
      },
    });

    return res.data.result;
  }

  public async getProSubscription(
    id: string,
    valid: boolean
  ): Promise<ProSubscription[]> {
    let res = await this.api.get(`/pro/${id}/subscription`, {
      params: {
        valid: valid,
      },
    });

    return res.data.result;
  }

  public async getProRetailpointStats(
    proId: string,
    rpId: string,
    begin: Date,
    end: Date
  ): Promise<ProRetailpointStats> {
    let res = await this.api.get(
      `/pro/${proId}/retailpoint/${rpId}/statistics`,
      {
        params: {
          start_date: begin,
          end_date: end,
        },
      }
    );
    return res.data.result;
  }

  public async getRetailointCatchmentsArea(
    proId: string,
    rpId: string,
    begin: Date,
    end: Date,
    distance_interval: number,
    min: number,
    max: number
  ): Promise<number[]> {
    let res = await this.api.get(
      `/pro/${proId}/retailpoint/${rpId}/statistics/catchment_area`,
      {
        params: {
          start_date: begin,
          end_date: end,
          distance_interval: distance_interval,
          min: min,
          max: max,
        },
      }
    );

    return res.data.result;
  }

  public async getRetailointDeliveryDistribution(
    proId: string,
    rpId: string,
    begin: Date,
    end: Date,
    interval: StatsInterval
  ): Promise<DatedStatNumber[]> {
    let res = await this.api.get(
      `/pro/${proId}/retailpoint/${rpId}/statistics/deliveries_distribution`,
      {
        params: {
          start_date: begin,
          end_date: end,
          interval: interval,
        },
      }
    );

    return res.data.result;
  }

  public async getRetailointCartPrice(
    proId: string,
    rpId: string,
    begin: Date,
    end: Date,
    interval: StatsInterval
  ): Promise<DatedStatNumber[]> {
    let res = await this.api.get(
      `/pro/${proId}/retailpoint/${rpId}/statistics/cart_price`,
      {
        params: {
          start_date: begin,
          end_date: end,
          interval: interval,
        },
      }
    );

    return res.data.result;
  }

  public async getProStats(
    proId: string,
    begin: Date,
    end: Date,
    retailpointsIds: string[]
  ): Promise<ProRetailpointStats> {
    let res = await this.api.get(`/pro/${proId}/statistics`, {
      params: {
        start_date: begin,
        end_date: end,
        retailpoint_ids: retailpointsIds.join(),
      },
    });
    return res.data.result;
  }

  public async getProRetailsPointsStats(
    proId: string,
    retailpointsIds: string[],
    begin: Date,
    end: Date
  ): Promise<ProStats[]> {
    let res = await this.api.get(`/pro/${proId}/statistics/retailpoints`, {
      params: {
        retailpoint_ids: retailpointsIds.join(),
        limit: retailpointsIds.length,
        start_date: begin,
        end_date: end,
      },
    });

    return res.data.result;
  }

  public async getDownloadInvoice(id: string): Promise<string> {
    return (
      baseUrl +
      this.api.getUri({
        url: `/invoice/${id}/download`,
        params: {
          oauth_access_token: await firstValueFrom(AuthStorage.instance.get()),
          oauth_timestamp: new Date().getTime().toString(),
        },
      })
    );
  }

  public async getDownloadInvoices(ids: string[]): Promise<string> {
    return (
      baseUrl +
      this.api.getUri({
        url: "/invoice/download",
        params: {
          invoice: ids.join(),
          oauth_access_token: await firstValueFrom(AuthStorage.instance.get()),
          oauth_timestamp: new Date().getTime().toString(),
        },
      })
    );
  }

  public async getOrder(orderId: string): Promise<Order> {
    let res = await this.api.get(`/order/${orderId}`);
    return res.data.result;
  }

  public async createOrder(proId: string, items?: OrderItem[]): Promise<Order> {
    let res = await this.api.post(`/order`, {
      pro_id: proId,
      items: items,
    });
    return res.data.result;
  }

  public async getProRetailPoints(proId: string): Promise<ProRetailpointList> {
    let res = await this.api.get(`/pro/${proId}/retailpoint`, {
      params: {
        enabled: true,
        limit: -1,
      },
    });

    return res.data.result;
  }

  public async validateOrder(orderId: string): Promise<Order> {
    let res = await this.api.post(`/order/${orderId}/validate`);

    return res.data.result;
  }

  public async emailInvoice(
    email: string,
    invoiceIds: string[]
  ): Promise<void> {
    let res = await this.api.post(`/invoice/export_email`, {
      invoice_ids: invoiceIds,
      email: email,
    });

    return res.data.result;
  }

  public async getRetailPointMissionTemplates(
    proId: string,
    rpId: string
  ): Promise<MissionTemplate[]> {
    let res = await this.api.get(
      `/pro/${proId}/retailpoint/${rpId}/mission_template`
    );

    return res.data.result;
  }

  public async getProMissionTemplates(
    proId: string
  ): Promise<MissionTemplate[]> {
    let res = await this.api.get(`/pro/${proId}/mission_template`);

    return res.data.result;
  }

  public async getPrebook(proId: string, prebookId: string): Promise<any> {
    let res = await this.api.get(`/pro/${proId}/prebook/${prebookId}`);

    return res.data.result;
  }

  private removeEmpty(obj: Object): Object {
    if (Array.isArray(obj)) {
      return obj
        .map(v => (v && typeof v === "object" ? this.removeEmpty(v) : v))
        .filter(v => !(v == null));
    } else {
      return Object.entries(obj)
        .map(([k, v]) => [
          k,
          v && typeof v === "object" ? this.removeEmpty(v) : v,
        ])
        .reduce((a, [k, v]) => (v == null ? a : ((a[k] = v), a)), {});
    }
  }

  public async updatePrebook(
    proId: string,
    prebookId: string,
    orderId: string,
    orderName: string,
    receiver: MissionClient,
    sender: MissionClient,
    receiverAddress?: MissionAddress,
    senderAddress?: MissionAddress,
    options?: string[],
    templateId?: string,
    price?: number,
    itemsNb?: number,
    transportType?: TransportType,
    returnPolicy?: ReturnPolicy,
    deliveryStart?: Date,
    deliveryEnd?: Date,
    ceremonyDate?: Date,
    comment?: string
  ): Promise<PrebookChanges> {
    let payload = {
      order_id: orderId,
      order: {
        order_id: orderName,
        options: options,
        transport_type: transportType,
      },
      sender: sender,
      pickup_address:
        sender?.type == MissionClientType.user && senderAddress != null
          ? {
            formatted_address: senderAddress.formattedAddress,
            favorite_address_id: senderAddress.favoriteAddressId,
            street_number: senderAddress.streetNumber,
            street: senderAddress.street,
            country: senderAddress.country,
            city: senderAddress.city,
            zip: senderAddress.zip,
            location: {
              type: "Point",
              coordinates: senderAddress.location.coordinates,
              altitude: 0,
            },
            additional_number: senderAddress.additionalNumber,
            apartment: senderAddress.apartment,
            floor: senderAddress.floor,
            additional: senderAddress.additional,
          }
          : null,
      delivery_address:
        receiver?.type == MissionClientType.user && receiverAddress != null
          ? {
            formatted_address: receiverAddress.formattedAddress,
            street_number: receiverAddress.streetNumber,
            favorite_address_id: receiverAddress.favoriteAddressId,
            street: receiverAddress.street,
            country: receiverAddress.country,
            city: receiverAddress.city,
            zip: receiverAddress.zip,
            location: {
              type: "Point",
              coordinates: receiverAddress.location.coordinates,
              altitude: 0,
            },
            additional_number: receiverAddress.additionalNumber,
            apartment: receiverAddress.apartment,
            floor: receiverAddress.floor,
            additional: receiverAddress.additional,
          }
          : null,
      receiver: receiver,
      extra: {
        nb_items: itemsNb,
        price: price,
        ceremonyDate: ceremonyDate?.toISOString(),
      },
      mission_template_id: templateId,
      delivery_start: deliveryStart?.toISOString(),
      delivery_end: deliveryEnd?.toISOString(),
      comment: comment,
      return_policy: returnPolicy,
    };

    let res = await this.api.put(
      `/pro/${proId}/prebook/${prebookId}`,
      this.removeEmpty(payload)
    );

    return res.data.result;
  }

  public async addProSubscription(
    proId: string,
    subscription: string,
    billingPeriod: string
  ) {
    let res = await this.api.post(`/pro/${proId}/subscription `, {
      subscription_name: subscription,
      billing_period: billingPeriod,
    });

    return res.data.result;
  }

  public async editProSubscription(
    proId: string,
    subscription: string,
    billingPeriod: string
  ): Promise<SubscriptionPreview> {
    let res = await this.api.put(`/pro/${proId}/subscription`, {
      subscription_name: subscription,
      billing_period: billingPeriod,
    });

    return res.data.result;
  }

  public async previewProSubscription(
    proId: string,
    subscription: string,
    billingPeriod: string
  ): Promise<SubscriptionPreview> {
    let res = await this.api.get(`/pro/${proId}/subscription/preview`, {
      params: {
        subscription_name: subscription,
        billing_period: billingPeriod,
      },
    });

    return res.data.result;
  }

  public async cancelProSubscription(id: string): Promise<SubscriptionPreview> {
    let res = await this.api.post(`/pro_subscription/${id}/cancel`);

    return res.data.result;
  }

  public async addProCard(proId: string) {
    let res = await this.api.post(`/pro/${proId}/wallet/card`);

    return res.data.result;
  }

  public async addProIban(proId: string): Promise<ClientDetails> {
    let res = await this.api.post(`/pro/${proId}/wallet/iban`);

    return res.data.result;
  }

  public async getProPaymentMethods(
    proId: string,
    paymentType?: string
  ): Promise<PaymentMethod[]> {
    const res = await this.api.get(`/pro/${proId}/wallet/payment_method`, {
      params: paymentType ? { type: paymentType } : {},
    });

    return res.data.result;
  }

  public async setPrimaryPaymentMethod(
    proId: string,
    methodId: string
  ): Promise<void> {
    let res = await this.api.post(
      `/pro/${proId}/wallet/payment_method/${methodId}/primary`
    );

    return res.data.result;
  }

  public async deletePaymentMethod(
    proId: string,
    methodId: string
  ): Promise<void> {
    let res = await this.api.delete(
      `/pro/${proId}/wallet/payment_method/${methodId}`
    );

    return res.data.result;
  }

  public async getProLimit(proId: string): Promise<ProLimit> {
    let res = await this.api.get(`/pro/${proId}/limit`);

    return res.data.result;
  }

  public async getDeliverer(
    proId: string,
    filter: string
  ): Promise<ProDeliverer[]> {
    let res = await this.api.get(`/pro/${proId}/deliverer`, {
      params: {
        sorting_type: filter,
      },
    });
    return res.data.result;
  }

  public async getFavoriteDeliverers(
    proId: string,
    rpId: string
  ): Promise<ProFavoriteDeliverer[]> {
    let res = await this.api.get(`pro/${proId}/retailpoint/${rpId}/like`);
    return res.data.result;
  }

  public async getBlockedDeliverers(
    proId: string
  ): Promise<ProBlockedDeliverer> {
    let res = await this.api.get(`pro/${proId}/blocked_user`);
    return res.data.result;
  }

  public async deprecateShopper(
    proId: string,
    delivererId: string
  ): Promise<BlockedDeliverer> {
    let payload = { recipient_id: delivererId, reason: "other" };

    let res = await this.api.post(`/pro/${proId}/block_deliveries`, payload);
    return res.data.result;
  }

  public async dislikeShopper(
    proId: string,
    retailPointId: string,
    likeId: string
  ): Promise<any> {
    let res = await this.api.post(
      `/pro/${proId}/retailpoint/${retailPointId}/like/${likeId}/dislike`
    );

    return res.data.result;
  }

  public async likeShopper(
    proId: string,
    retailPointId: string,
    delivererId: string,
    delivererType: string
  ): Promise<ProFavoriteDeliverer> {
    let payload = { recipient_id: delivererId, recipient_type: delivererType };

    let res = await this.api.post(
      `/pro/${proId}/retailpoint/${retailPointId}/like`,
      payload
    );

    return res.data.result;
  }

  public async payOrder(orderId: string, methodId: string): Promise<Order> {
    let payload = { payment_method_id: methodId };

    let res = await this.api.post(`/order/${orderId}/pay`, payload);

    return res.data.result;
  }

  public async searchSocietyRegistry(
    registryNumber: string
  ): Promise<SocietyRegistry> {
    const res = await this.api.get(`/society/search`, {
      params: {
        number: registryNumber,
      },
    });
    return res.data.result;
  }

  public async putSociety(
    societyId: string,
    society: SocietyRequestParams
  ): Promise<Society> {
    const res = await this.api.put(`/pro/${societyId}`, {
      name: society.name,
      activity_type: society.activityType,
      identification_number: society.identificationNumber,
      society_id: societyId,
      address: {
        formatted_address: society.address.formattedAddress,
        street_number: society.address.streetNumber,
        street: society.address.street,
        country: society.address.country,
        city: society.address.city,
        zip: society.address.zip,
        location: {
          type: "Point",
          coordinates: society.address.location.coordinates,
        },
        additional_number: society.address.apartment,
        floor: society.address.floor,
      },
      owner: {
        firstname: society.ownerFirstname,
        lastname: society.ownerLastname,
        phone: society.ownerPhone,
        email: society.ownerEmail,
      },
    });

    return res.data.result;
  }

  public async getNotifications(
    userId: string,
    retailpointId: string,
    skip: number,
    limit: number
  ): Promise<NotificationResponse> {
    const res = await this.api.get(`/v2/user/${userId}/notification`, {
      params: {
        app_names: APP_NAME,
        recipient__id: retailpointId,
        recipient__type__: "retail_point",
        sort: "-sentAt",
        skip,
        limit,
      },
    });
    return res.data.result;
  }

  public async postReadNotification(
    userId: string,
    notificationId: string
  ): Promise<void> {
    const res = await this.api.post(
      `/user/${userId}/notification/${notificationId}/read`
    );
    return res.data.result;
  }

  public async postReadAllNotifications(
    userId: string,
    retailpointId: string
  ): Promise<void> {
    const res = await this.api.post(`/user/${userId}/notification/read/all`, {
      params: {
        recipient__id: retailpointId,
        recipient__type__: "retail_point",
      },
    });
    return res.data.result;
  }

  public async getUnreadNotificationNumber(
    userId: string,
    retailpointId: string
  ): Promise<NotificationUnreadResponse> {
    const res = await this.api.get(`/user/${userId}/notification/unread`, {
      params: {
        recipient__id: retailpointId,
        recipient__type__: "retail_point",
      },
    });
    return res.data.result;
  }

  public async resetProSecret(proId: string): Promise<Object> {
    const res = await this.api.post(`/pro/${proId}/api_access/reset`);
    return res.data.result;
  }

  public async getProFavoriteAddress(
    proId: string,
    retailpointId: string,
    limit: number
  ): Promise<PaginatedResult<FavoriteAddress>> {
    const res = await this.api.get(`/pro/${proId}/favorite_address`, {
      params: {
        about__id: retailpointId,
        limit: limit,
      },
    });
    return res.data.result;
  }

  public async createProFavoriteAddress(
    client: MissionClient,
    owner: FavoriteAddressOwner,
    about: FavoriteAddressOwner
  ): Promise<FavoriteAddress> {
    const res = await this.api.post(`/favorite_address`, {
      ...client,
      owner: owner,
      about: about,
    });
    return res.data.result;
  }

  public async getSupportContactReasons(
    userGroups: string[]
  ): Promise<ContactReasonEntity[]> {
    const res = await this.api.get(`/support/contact_reason`, {
      params: {
        limit: -1,
        user_group_names: userGroups.join(","),
      },
    });
    return res.data.result.data;
  }

  public async getPhoneCallRequests(
    userId: string,
    status: string[],
    callerType: string
  ) {
    const res = await this.api.get(
      `/support/user/${userId}/phone_call_request`,
      {
        params: {
          limit: -1,
          status__in: status.join(","),
          caller__type__: callerType,
        },
      }
    );

    return res.data.result.data;
  }

  public async getPhoneCallRequest(requestId: string) {
    const res = await this.api.get(`/support/phone_call_request/${requestId}`);

    return res.data.result;
  }

  public async cancelPhoneCallRequest(requestId: string) {
    const res = await this.api.post(
      `/support/phone_call_request/${requestId}/cancel`
    );

    return res.data.result;
  }

  public async requestPhoneCall(props: {
    callerId: string;
    phoneNumber: string;
    reasonId: string;
    callerType: string;
    comment?: string;
  }): Promise<PhoneCallRequest> {
    const res = await this.api.post(`/support/phone_call_request`, {
      phone_number: props.phoneNumber,
      contact_reason_id: props.reasonId,
      caller: {
        id: props.callerId,
        type: props.callerType,
      },
      extra: {
        comment: props.comment ?? "",
      },
    });

    return res.data.result;
  }

  public async login(props: {
    grantType: "password" | "client_credentials";
    appId: string;
    appSecret: string;
    refreshToken?: string;
    username?: string;
    password?: string;
  }): Promise<string> {
    const res = await this.api.post(
      `/oauth/token`,
      {
        grant_type: props.grantType,
        app_id: props.appId,
        app_secret: props.appSecret,
        refresh_token: props.refreshToken,
        username: props.username,
        password: props.password,
      },
      {
        headers: {
          Authorization: "none",
        },
      }
    );
    return res.data.result.accessToken;
  }

  public async registerUser(props: {
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    password: string;
    birthDate: Date;
    sex: UserSex;
  }) {
    const res = await this.api.post(
      `/user`,
      {
        firstname: props.firstname,
        lastname: props.lastname,
        phone: props.phone,
        email: props.email,
        birthdate: props.birthDate,
        password: props.password,
        gender: props.sex.toString(),
      },
      {
        headers: {
          Authorization: "credentials",
        },
      }
    );
    return res.data.result;
  }

  public async getTerm(termName: string): Promise<Term> {
    const res = await this.api.get(
      `/terms/${termName}`,
      {
        headers: {
          Authorization: "credentials",
        },
      }
    );
    return res.data.result;
  }

  public async acceptTerm(userId: string, term: string, version: number) {
    const res = await this.api.post(
      `/user/${userId}/accept_terms`,
      {
        type: term,
        version: version
      }
    );
    return res.data.result;
  }
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
