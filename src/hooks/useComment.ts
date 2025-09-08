import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { getToken } from '../features/auth/authSlice'
import {
  createUpdateComment,
  deleteComment,
  getCommentArticle
} from '../services/apiComment'
import type { PaginatedResult } from '../types'
import type { Comment, CommentInputPayload } from '../types/comment'

export function useComments(page?: number, pageSize = 8) {
  const token = useSelector(getToken)

  const {
    data: comments,
    isPending: isLoading,
    isFetched,
    error
  } = useQuery<PaginatedResult<Comment>>({
    queryKey: ['comments', page],
    queryFn: () => getCommentArticle(page, pageSize, token!)
  })

  return {
    comments,
    isLoading,
    isFetched,
    error
  }
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
      queryClient.invalidateQueries({ queryKey: ['comments'] })

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

export function useDeleteComment() {
  const token = useSelector(getToken)
  const queryClient = useQueryClient()

  const { mutate: removeComment, isPending: isLoading } = useMutation({
    mutationFn: (id: string) => deleteComment(id, token!),
    onSuccess: () => {
      toast.success('Comment Article deleted successfully')

      queryClient.invalidateQueries({ queryKey: ['article-detail'] })
      queryClient.invalidateQueries({ queryKey: ['comments'] })
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to delete article')
    }
  })

  return { removeComment, isLoading }
}
