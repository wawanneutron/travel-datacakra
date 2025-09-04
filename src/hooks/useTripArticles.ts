import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { getTripArticles } from '../services/apiArticle'
import type { TravelItem } from '../types/travel'
import type { PaginatedResult } from '../types'

export function useLoadMoreTrip() {
  return useInfiniteQuery<PaginatedResult<TravelItem>>({
    queryKey: ['tripArticles'],
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

export function useTripArticles(page: number, pageSize = 8) {
  const {
    data: articles,
    isPending: isLoading,
    isFetched,
    error
  } = useQuery<PaginatedResult<TravelItem>>({
    queryKey: ['tripArticles', page],
    queryFn: () => getTripArticles(page, pageSize)
  })

  return {
    articles,
    isLoading,
    isFetched,
    error
  }
}
