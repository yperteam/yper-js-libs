export interface PaginatedResult<T> {
  count: PaginatedCount;
  data: T[];
}

interface PaginatedCount {
  current: number;
  total: number;
}
