export interface PaginatedResult<T> {
  items: T[]
  page: number
  totalPages: number
  totalItems: number
}

export interface ChildrenProps {
  children: ReactNode
}
