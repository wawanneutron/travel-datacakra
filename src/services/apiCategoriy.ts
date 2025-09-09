import type { ErrorResponse, PaginatedResult } from '../types'
import type {
  CategoryFormPayload,
  CategoryItem,
  CategoryResponse
} from '../types/category'

const BASE_API = import.meta.env.VITE_API_URL

export const getCategories = async (
  page = 1,
  pageSize = 8,
  token: string
): Promise<PaginatedResult<CategoryItem>> => {
  const headers: HeadersInit = {}

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(
    `${BASE_API}/categories?pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    {
      method: 'GET',
      headers
    }
  )

  const text = await res.text()
  const json: CategoryResponse & { error?: ErrorResponse } = text
    ? JSON.parse(text)
    : null

  const { data, meta, error } = json

  if (!res.ok) {
    throw {
      cause: error?.status ?? res.status,
      name: error?.name ?? 'ApiError',
      message: error?.message ?? 'Failed to fetch categories'
    } as Error
  }

  return {
    items: data,
    page: meta.pagination.page,
    totalPages: meta.pagination.pageCount,
    totalItems: meta.pagination.total
  }
}

export const createUpdateCategory = async (
  payload: CategoryFormPayload,
  token: string,
  id?: string
): Promise<CategoryItem> => {
  const method = id ? 'PUT' : 'POST'
  const url = id ? `${BASE_API}/categories/${id}` : `${BASE_API}/categories`

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
      `Failed to ${id ? 'update' : 'create'} category: ${json?.error?.message}`
    )

  return json
}

export const deleteCategory = async (id: string, token: string) => {
  const res = await fetch(`${BASE_API}/categories/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const text = await res.text()
  const json = text ? JSON.parse(text) : null

  if (!res.ok) {
    throw new Error(json?.error?.message || 'Failed to delete category')
  }

  return json
}
