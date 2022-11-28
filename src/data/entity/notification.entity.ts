import { Count } from "./count.entity";

export interface NotificationUnreadResponse {
  unreadNumber: number;
}

export interface NotificationResponse {
  data: Notification[];
  count: Count;
}
export interface Notification {
  id: string;
  appNames: string[];
  about: About;
  createdAt: Date;
  extra?: Extra;
  message: string;
  read: boolean;
  recipient: Recipient;
  sent: boolean;
  sentAt: Date;
  title: string;
  trigger?: Trigger;
  type: string;
  viewed: boolean;
  subType: string;
}

interface Trigger {
  name: string;
  type: string;
  params: {
    missionId: string;
  };
}

interface Extra {
  extra: {
    id: string;
    availability: {
      reason: string;
      status: true;
      until: Date;
    };
  };
}

interface About {
  id: string;
  type: string;
}

interface Recipient {
  id: string;
  type: string;
  userId: string;
}

export enum subTypesEnum {
  deliveryShifted = "delivery_shifted",
  deliveryCanceled = "delivery_canceled",
}
