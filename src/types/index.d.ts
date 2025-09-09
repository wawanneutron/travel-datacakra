export interface PaginatedResult<T> {
  items: T[]
  page: number
  totalPages: number
  totalItems: number
}

export interface ChildrenProps {
  children: ReactNode
}

export interface UploadResponse {
  id: number
  url: string
  name: string
  mime: string
  size: number
  createdAt: string
  updatedAt: string
}

export interface ApiPagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface ErrorResponse {
  status: number
  name: string
  message: string
  details: Record<string, unknown>
}
