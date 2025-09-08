import type { User } from './auth'
import type { ApiPagination } from './travel'

export interface Comment {
  id: number
  documentId: string
  content: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string | null
  user: User
}

export interface CommentInputPayload {
  content: string
  article?: string
}

export interface CommentResponse {
  data: Comment[]
  meta: {
    pagination: ApiPagination
  }
}
