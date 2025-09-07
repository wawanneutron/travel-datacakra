import { useSelector } from 'react-redux'
import { getToken } from '../features/auth/authSlice'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createUpdateComment, getCommentById } from '../services/apiComment'
import type { Comment, CommentInputPayload } from '../types/comment'
import toast from 'react-hot-toast'

export function useCommentArticle(id?: string) {
  const token = useSelector(getToken)

  const {
    data: commentArticle,
    isLoading,
    error
  } = useQuery({
    queryKey: ['comment-article', id],
    queryFn: () => getCommentById(id!, token!),
    enabled: !!id && !!token
  })

  return { commentArticle, isLoading, error }
}

export function useSaveComments() {
  const token = useSelector(getToken)
  const queryClient = useQueryClient()

  const { mutate: saveComment, isPending: isLoading } = useMutation<
    Comment,
    Error,
    {
      payload: CommentInputPayload
      id?: string
    }
  >({
    mutationFn: ({
      payload,
      id
    }: {
      payload: CommentInputPayload
      id?: string
    }) => createUpdateComment(payload, token!, id),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['article-detail'] })

      toast.success(
        variables.id
          ? 'Comment successfully updated'
          : 'New comment successfully created'
      )
    },
    onError: (err) => toast.error(err.message)
  })

  return { saveComment, isLoading }
}
