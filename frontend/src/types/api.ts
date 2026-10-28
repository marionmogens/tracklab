export interface PaginationParams {
  offset: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  search?: string;
  operator?: 'AND' | 'OR';
  ignoreCase?: boolean;
  include?: Record<string, string>;
  exclude?: Record<string, string>;
}

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}