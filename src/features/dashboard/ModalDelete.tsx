import { useDeleteArticle } from '../../hooks/useDeleteArticle'
import { useDeleteCategory } from '../../hooks/useDeleteCategory'
import type { ModalDeleteProps } from '../../types/ui'
import Modal from '../../ui/Modal'
import SpinnerMini from '../../ui/SpinnerMini'

function ModalDelete({
  isOpen,
  onCloseModal,
  documentId,
  TypeDelete
}: ModalDeleteProps) {
  const { removeArticle, isDeleArticle } = useDeleteArticle()
  const { removeCategory, isDeletCategory } = useDeleteCategory()

  const isLoading = isDeleArticle || isDeletCategory

  const handleDelete = () => {
    if (!documentId) return

    if (TypeDelete === 'article') {
      removeArticle(documentId, {
        onSuccess: () => onCloseModal()
      })
    }

    if (TypeDelete === 'category') {
      removeCategory(documentId, {
        onSuccess: () => onCloseModal()
      })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal}>
      <div className="py-4">
        <h2 className="text-lg font-semibold mb-4">
          Are you sure you want to delete?
        </h2>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCloseModal}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="flex justify-between items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            disabled={isLoading}
          >
            <span>Delete</span>
            {isLoading && <SpinnerMini />}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ModalDelete
