interface PaginationInfo {
  page: number;
  limit: number;
  offset: number;
  total_pages: number;
  total_records: number;
  has_next: boolean;
  has_previous: boolean;
  next_page: string;
  previous_page: boolean;
}

export interface APIPaginatedResponse<T> {
  data: Record<string, T>[];
  pagination: PaginationInfo;
}


export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationInfo;
}
