export interface ApiResponse {
  message: string;
}
export interface Meta {
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}
export interface PaginatedResponse<T> {
  items: T[];
  meta: Meta;
}
