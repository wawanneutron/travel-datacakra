export interface TravelItem {
  id: number
  title: string
  description: string
  cover_image_url: string
  createdAt: string
}

export interface ApiPagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface TravelResponse {
  data: TravelItem[]
  meta: {
    pagination: ApiPagination
  }
}
