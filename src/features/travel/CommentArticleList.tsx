import { FaPen, FaTrash } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import type { Comment } from '../../types/comment'
import { formatDate } from '../../utils'
import { getUser } from '../auth/authSlice'
import { useState } from 'react'
import ModalDelete from '../dashboard/ModalDelete'
import ModalComment from '../dashboard/ModalComment'
import type { PurposeType } from '../../types/ui'

function CommentArticleList({ comment }: { comment: Comment }) {
  const user = useSelector(getUser)
  const [purpose, setPurpose] = useState<PurposeType>()
  const [isModalDelete, setIsModalDelete] = useState<boolean>(false)
  const [isModalEdit, setIsModalEdit] = useState<boolean>(false)
  const canDeleteComment = user?.documentId === comment?.user.documentId

  const handleDelete = () => setIsModalDelete(true)

  const handleEditComment = () => {
    setPurpose('edit')
    setIsModalEdit(true)
  }

  return (
    <>
      <li className="relative border border-primary-800 rounded-lg p-3 bg-primary-900 ">
        <p className="text-lg text-primary-400 capitalize mb-2">
          {comment.user.username}
        </p>

        <p className="text-primary-200">
          {comment.content}

          {canDeleteComment && (
            <button
              onClick={handleEditComment}
              className="text-accent-400 hover:text-accent-500 ml-2"
              title="Edit comment"
            >
              <FaPen className="h-4 w-4" />
            </button>
          )}
        </p>

        <span className="text-xs text-primary-400">
          {formatDate(comment.createdAt)}
        </span>

        {canDeleteComment && (
          <div
            onClick={handleDelete}
            className="absolute top-2 right-2 flex items-center cursor-pointer rounded-full w-10 h-10 bg-primary-800"
          >
            <button
              className="text-red-400 hover:text-red-300 ml-3"
              title="Delete comment"
            >
              <FaTrash className="h-4 w-4" />
            </button>
          </div>
        )}
      </li>

      <ModalDelete
        isOpen={isModalDelete}
        TypeDelete="comment"
        documentId={comment.documentId}
        onCloseModal={() => setIsModalDelete(false)}
      />

      <ModalComment
        purpose={purpose}
        item={comment}
        isOpen={isModalEdit}
        onCloseModal={() => setIsModalEdit(false)}
      />
    </>
  )
}

export default CommentArticleList
