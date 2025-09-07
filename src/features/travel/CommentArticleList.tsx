import type { Comment } from '../../types/comment'
import { formatDate } from '../../utils'

function CommentArticleList({ comment }: { comment: Comment }) {
  return (
    <li className="border border-primary-800 rounded-lg p-3 bg-primary-900">
      <p className="text-lg text-primary-400 capitalize mb-2">
        {comment.user.username}
      </p>
      <p className="text-primary-200">{comment.content}</p>
      <span className="text-xs text-primary-400">
        {formatDate(comment.createdAt)}
      </span>
    </li>
  )
}

export default CommentArticleList
