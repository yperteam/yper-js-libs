export interface DeliveryHours {
  day: number;
  hours: {
    end: Date;
    start: Date;
  };
}
