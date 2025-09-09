import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../services/apiCategoriy'
import type { PaginatedResult } from '../types'
import type { CategoryItem } from '../types/category'
import { useSelector } from 'react-redux'
import { getToken } from '../features/auth/authSlice'

export function useCategories(page?: number, pageSize = 8) {
  const token = useSelector(getToken)

  const {
    data: categories,
    isPending: isLoading,
    isFetched,
    error
  } = useQuery<PaginatedResult<CategoryItem>>({
    queryKey: ['categories', page],
    queryFn: () => getCategories(page, pageSize, token!),
    throwOnError: true
  })

  return {
    categories,
    isLoading,
    isFetched,
    error
  }
}
