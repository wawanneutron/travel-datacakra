import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../services/apiCategoriy'
import type { PaginatedResult } from '../types'
import type { CategoryItem } from '../types/category'

export function useCategories(page?: number, pageSize = 8) {
  const {
    data: categories,
    isPending: isLoading,
    isFetched,
    error
  } = useQuery<PaginatedResult<CategoryItem>>({
    queryKey: ['categories', page],
    queryFn: () => getCategories(page, pageSize)
  })

  return {
    categories,
    isLoading,
    isFetched,
    error
  }
}
