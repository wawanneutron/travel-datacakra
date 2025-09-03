import type { PaginatedResult } from '../types'
import type { TravelItem, TravelResponse } from '../types/travel'

const BASE_API = import.meta.env.VITE_API_URL

export const getTripArticles = async (
  page = 1,
  pageSize = 8
): Promise<PaginatedResult<TravelItem>> => {
  const res = await fetch(
    `${BASE_API}/articles?pagination[page]=${page}&pagination[pageSize]=${pageSize}`
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
