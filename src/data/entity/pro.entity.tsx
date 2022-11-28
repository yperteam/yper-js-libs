import { Address } from "@yper-script/react/data/entity/address.entity";
import { Society } from "./society.entity";

export interface Pro {
  id: string;
  billingEmails: null;
  commercialOfferId?: string;
  companyIds: [];
  companyInfos: Society;
  createdAt?: Date;
  details: string;
  enabled: boolean;
  formattedAddress: string;
  frozen: boolean;
  invoicingId?: string;
  isNew: boolean;
  recipients: [];
  restricted?: boolean;
  retailPointIds: string[];
  salesRepresentative?: string;
  securityToken?: string;
  settings: Settings;
  societyId: string;
  stats: Stats;
}

export interface Settings {
  defaultDeliveryTemplate: null;
  delivery: {
    p2pAllowed: boolean;
    reverseAllowed: boolean;
    minimumMinutesBeforeStart: number;
    minimumMinutesBetweenStartAndEnd: number;
    maxDeliveryValue: number;
  };
  hidePrices: boolean;
  paymentMethod: string;
  reporting: {};
  canAccess: {
    advancedReportingStats: boolean;
    reportingStats: boolean;
    securityToken: boolean;
    deliverer: boolean;
  };
}

export interface Stats {
  averageOpinionAsAuthor: number;
  averageOpinionAsSubject: number;
  caMonth: number;
  caYear: number;
  favoriteShopperCount: number;
  lastDeliveryDate: Date;
  totalDeliveries: number;
  totalDeliveries30d: number;
  totalDeliveriesLastMonth: number;
  totalDeliveriesMonth: number;
  totalDeliveriesWeek: number;
  "totalFinishedDeliveriesM-1": number;
  "totalFinishedDeliveriesM-2": number;
  "totalFinishedDeliveriesM-3": number;
  "totalFinishedSpentDeliveriesM-1": number;
  "totalFinishedSpentDeliveriesM-2": number;
  "totalFinishedSpentDeliveriesM-3": number;
  totalOpinionAsAuthor: number;
  totalOpinionAsSubject: number;
}
