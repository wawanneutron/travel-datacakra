export interface CategoryItem {
  id: number
  documentId: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string | null
}

export interface CategoryResponse {
  data: TravelItem[]
  meta: {
    pagination: ApiPagination
  }
}

export interface CategoryFormPayload {
  name: string
  description: string
}
