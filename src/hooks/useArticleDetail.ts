import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { getArticle } from '../services/apiArticle'
import { getToken } from '../features/auth/authSlice'
import type { TravelItem } from '../types/travel'

export function useArticleDetail(id: string | undefined) {
  const token = useSelector(getToken)

  const {
    data: article,
    isLoading,
    error,
    isFetched
  } = useQuery<TravelItem, Error>({
    queryKey: ['article', id],
    queryFn: () => getArticle(id!, token!)
    // enabled: !!id && !!token
  })

  return { article, isLoading, error, isFetched }
}
