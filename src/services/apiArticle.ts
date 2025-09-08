import type { PaginatedResult } from '../types'
import type {
  ArticleFormPayload,
  TravelItem,
  TravelResponse
} from '../types/travel'

const BASE_API = import.meta.env.VITE_API_URL

export const getTripArticles = async (
  page = 1,
  pageSize = 8
): Promise<PaginatedResult<TravelItem>> => {
  const res = await fetch(
    `${BASE_API}/articles?pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    { method: 'GET' }
  )
  if (!res.ok) throw new Error('Failed to fetch trip articles')

  const { data, meta }: TravelResponse = await res.json()

  return {
    items: data,
    page: meta.pagination.page,
    totalPages: meta.pagination.pageCount,
    totalItems: meta.pagination.total
  }
}

export const createUpdateArticle = async (
  payload: ArticleFormPayload,
  token: string,
  id?: string
): Promise<TravelItem> => {
  const method = id ? 'PUT' : 'POST'
  const url = id ? `${BASE_API}/articles/${id}` : `${BASE_API}/articles`

  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ data: payload })
  })

  const json = await res.json()

  if (!res.ok)
    throw new Error(
      `Failed to ${id ? 'update' : 'create'} article: ${json?.error?.message}`
    )

  return json
}

export const deleteArticle = async (id: string, token: string) => {
  const res = await fetch(`${BASE_API}/articles/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const text = await res.text()
  const json = text ? JSON.parse(text) : null

  if (!res.ok) {
    throw new Error(json?.error?.message || 'Failed to delete article')
  }

  return json
}

export const getArticleById = async (id: string, token: string) => {
  const res = await fetch(
    `${BASE_API}/articles/${id}/?populate[comments][populate][user]=*&populate[user]=*&populate[category]=*`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  const text = await res.text()
  const json = text ? JSON.parse(text) : null

  if (!res.ok) {
    throw new Error(json?.error?.message || 'Failed to fetch detail article')
  }

  return json.data
}
