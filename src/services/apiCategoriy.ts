import type { PaginatedResult } from '../types'
import type { CategoryItem, CategoryResponse } from '../types/category'

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
