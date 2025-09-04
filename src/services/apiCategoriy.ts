import type { PaginatedResult } from '../types'
import type {
  CategoryFormPayload,
  CategoryItem,
  CategoryResponse
} from '../types/category'

const BASE_API = import.meta.env.VITE_API_URL

export const getCategories = async (
  page = 1,
  pageSize = 8
): Promise<PaginatedResult<CategoryItem>> => {
  const res = await fetch(
    `${BASE_API}/categories?pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  )
  if (!res.ok) throw new Error('Failed to fetch trip categories')

  const { data, meta }: CategoryResponse = await res.json()

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
