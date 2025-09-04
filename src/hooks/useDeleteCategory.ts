import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { getToken } from '../features/auth/authSlice'
import { deleteCategory } from '../services/apiCategoriy'

export function useDeleteCategory() {
  const token = useSelector(getToken)
  const queryClient = useQueryClient()

  const { mutate: removeCategory, isPending: isDeletCategory } = useMutation({
    mutationFn: (id: string) => deleteCategory(id, token!),
    onSuccess: () => {
      toast.success('Category deleted successfully')

      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to delete Category')
    }
  })

  return { removeCategory, isDeletCategory }
}
