import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { getToken } from '../features/auth/authSlice'
import { createUpdateArticle } from '../services/apiArticle'
import type { ArticleFormPayload, TravelItem } from '../types/travel'

export function useSaveArticle() {
  const token = useSelector(getToken)

  const { mutate: saveArticle, isPending } = useMutation<
    TravelItem,
    Error,
    { payload: ArticleFormPayload; id?: string }
  >({
    mutationFn: ({
      payload,
      id
    }: {
      payload: ArticleFormPayload
      id?: string
    }) => createUpdateArticle(payload, token!, id),

    onSuccess: (_, variables) => {
      toast.success(
        variables.id
          ? 'Article successfully updated'
          : 'New article successfully created'
      )
    },
    onError: (err) => toast.error(err.message)
  })

  return { isPending, saveArticle }
}
