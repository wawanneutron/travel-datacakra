import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { getToken } from '../features/auth/authSlice'
import { getTripArticles } from '../services/apiArticle'
import type { PaginatedResult } from '../types'
import type { TravelItem } from '../types/travel'

export function useLoadMoreTrip() {
  return useInfiniteQuery<PaginatedResult<TravelItem>>({
    queryKey: ['articles'],
    queryFn: ({ pageParam = 1 }) => getTripArticles(pageParam as number, 8),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const loadedItems = allPages.flatMap((p) => p.items).length

      // stop if all items loaded
      if (loadedItems >= lastPage.totalItems) return undefined

      // any other, load the next page
      return lastPage.page + 1
    }
  })
}

export function useTripArticles(page?: number, pageSize = 8) {
  const token = useSelector(getToken)

  const {
    data: articles,
    isPending: isLoading,
    isFetched,
    error
  } = useQuery<PaginatedResult<TravelItem>>({
    queryKey: ['tripArticles', page],
    queryFn: () => getTripArticles(page, pageSize, token!),
    throwOnError: true
  })

  return {
    articles,
    isLoading,
    isFetched,
    error
  }
}
