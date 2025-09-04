import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { deleteArticle } from '../services/apiArticle'
import { useSelector } from 'react-redux'
import { getToken } from '../features/auth/authSlice'

export function useDeleteArticle() {
  const token = useSelector(getToken)
  const queryClient = useQueryClient()

  const { mutate: removeArticle, isPending: isDele } = useMutation({
    mutationFn: (id: string) => deleteArticle(id, token!),
    onSuccess: () => {
      toast.success('Article deleted successfully')

      queryClient.invalidateQueries({ queryKey: ['tripArticles'] })
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to delete article')
    }
  })

  return { removeArticle, isDele }
}
