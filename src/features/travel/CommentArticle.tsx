import { useSaveComments } from '../../hooks/useComment'
import type { Comment, CommentInputPayload } from '../../types/comment'
import Button from '../../ui/Button'
import SpinnerMini from '../../ui/SpinnerMini'
import CommentArticleList from './CommentArticleList'

interface CommentsProps {
  comments: Comment[]
  detailId: string
}

function CommentArticle({ comments, detailId }: CommentsProps) {
  const { saveComment, isLoading } = useSaveComments()

  const handlePostComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)
    const content = (formData.get('content') as string)?.trim()

    if (!content) return

    const data: CommentInputPayload = {
      content: formData.get('content') as string,
      article: detailId
    }

    saveComment({ payload: data }, { onSuccess: () => form.reset() })
  }

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold mb-4 text-primary-100">
        Comments <span className="text-amber-500">{comments.length || ''}</span>
      </h2>

      {comments.length ? (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <CommentArticleList key={comment.id} comment={comment} />
          ))}
        </ul>
      ) : (
        <p className="text-center italic text-primary-500">
          Oops, no comments here. Drop yours below
        </p>
      )}

      <form onSubmit={handlePostComment} className="mt-6">
        <textarea
          name="content"
          className="w-full h-24 input"
          placeholder="Write comment..."
        />
        <div className="flex justify-end">
          <Button disabled={isLoading}>
            <span>{isLoading ? 'Loading...' : 'Post Comment'}</span>
            {isLoading && <SpinnerMini />}
          </Button>
        </div>
      </form>
    </section>
  )
}

export default CommentArticle
