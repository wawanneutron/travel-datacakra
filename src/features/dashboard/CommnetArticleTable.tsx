import { useState } from 'react'
import { HiPencil, HiTrash } from 'react-icons/hi2'
import { useComments } from '../../hooks/useComment'
import type { Comment } from '../../types/comment'
import type { PurposeType } from '../../types/ui'
import Pagination from '../../ui/Pagination'
import Spinner from '../../ui/Spinner'
import ModalComment from './ModalComment'
import ModalDelete from './ModalDelete'

function CommentArticleTable() {
  const [page, setPage] = useState(1)
  const { comments, isLoading } = useComments(page, 8)

  const [purpose, setPurpose] = useState<PurposeType>()
  const [isModalEdit, setIsModalEdit] = useState<boolean>(false)
  const [isModalDelete, setIsModalDelete] = useState<boolean>(false)
  const [commentItem, setCommentItem] = useState<Comment>()

  const handleModalComment = (item?: Comment) => {
    setCommentItem(item)
    setIsModalEdit(true)
  }

  const handleModalDelete = (item: Comment) => {
    setCommentItem(item)
    setIsModalDelete(true)
  }

  if (isLoading) return <Spinner />

  return (
    <div className="mt-4">
      <div className="overflow-x-auto rounded-lg shadow-md mt-4">
        <table className="w-full text-left border-collapse border border-primary-700">
          <thead className="bg-primary-800 text-primary-100">
            <tr>
              <th className="px-4 py-3 border border-primary-700">ID</th>
              <th className="px-4 py-3 border border-primary-700">Content</th>
              <th className="px-4 py-3 border border-primary-700">Username</th>
              <th className="px-4 py-3 border border-primary-700">Email</th>
              <th className="px-4 py-3 border border-primary-700">
                Created At
              </th>
              <th className="px-4 py-3 border border-primary-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {comments?.items.map((comment) => (
              <tr
                key={comment.id}
                className="odd:bg-primary-900 even:bg-primary-950 hover:bg-primary-800"
              >
                <td className="px-4 py-3 border border-primary-700">
                  {comment.id}
                </td>
                <td className="px-4 py-3 border border-primary-700 max-w-[250px] truncate">
                  {comment.content}
                </td>
                <td className="px-4 py-3 border border-primary-700 max-w-[250px] truncate">
                  {comment.user.username}
                </td>
                <td className="px-4 py-3 border border-primary-700 max-w-[250px] truncate">
                  {comment.user.email}
                </td>
                <td className="px-4 py-3 border border-primary-700">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 border border-primary-700 max-w-[120px]">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        handleModalComment(comment)
                        setPurpose('edit')
                      }}
                      className="flex items-center gap-2 h-10 p-2 border border-accent-700"
                    >
                      <HiPencil />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleModalDelete(comment)}
                      className="flex items-center gap-2 h-10 p-2 border border-accent-700"
                    >
                      <HiTrash />
                      <span>Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={comments?.page || 1}
        totalPages={comments?.totalPages || 1}
        onPageChange={(newPage) => setPage(newPage)}
      />

      <ModalComment
        purpose={purpose}
        item={commentItem}
        isOpen={isModalEdit}
        onCloseModal={() => setIsModalEdit(false)}
      />

      <ModalDelete
        isOpen={isModalDelete}
        TypeDelete="comment"
        documentId={commentItem?.documentId}
        onCloseModal={() => setIsModalDelete(false)}
      />
    </div>
  )
}

export default CommentArticleTable
