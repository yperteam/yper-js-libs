export interface RatingDetails {
  distinct: Rating[];
  total: {
    average?: number;
    count: number;
    sum: number;
  };
}

export interface Rating {
  count: number;
  rating: number;
}
