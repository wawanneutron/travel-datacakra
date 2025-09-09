import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { getToken } from '../features/auth/authSlice'
import { getArticleById } from '../services/apiArticle'
import type { TravelItem } from '../types/travel'

export function useArticleDetail(id: string | undefined) {
  const token = useSelector(getToken)

  const {
    data: article,
    isLoading,
    error,
    isFetched
  } = useQuery<TravelItem, Error>({
    queryKey: ['article-detail', id],
    queryFn: () => getArticleById(id!, token!),
    enabled: !!id && !!token,
    throwOnError: true
  })

  return { article, isLoading, error, isFetched }
}
