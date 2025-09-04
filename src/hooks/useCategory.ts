import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { getToken } from '../features/auth/authSlice'
import { createUpdateCategory } from '../services/apiCategoriy'
import type { CategoryFormPayload, CategoryItem } from '../types/category'

export function useSaveCategory() {
  const token = useSelector(getToken)
  const queryClient = useQueryClient()

  const { mutate: saveCategory, isPending: isLoading } = useMutation<
    CategoryItem,
    Error,
    { payload: CategoryFormPayload; id?: string }
  >({
    mutationFn: ({
      payload,
      id
    }: {
      payload: CategoryFormPayload
      id?: string
    }) => createUpdateCategory(payload, token!, id),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })

      toast.success(
        variables.id
          ? 'Category successfully updated'
          : 'New category successfully created'
      )
    },
    onError: (err) => toast.error(err.message)
  })

  return { isLoading, saveCategory }
}
