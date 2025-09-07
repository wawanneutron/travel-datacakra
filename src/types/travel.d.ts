import type { Comment } from './comment'

export interface TravelItem {
  id: number
  title: string
  documentId: string
  description: string
  cover_image_url: string
  locale: string
  comments: Comment[]
  createdAt: string
  publishedAt: string
  updatedAt: string
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

export interface ArticleFormPayload {
  title: string
  description: string
  category: string
  cover_image_url: string
}
