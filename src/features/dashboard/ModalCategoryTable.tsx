import type { CategoryItem } from '../../types/category'
import type { ModalProps } from '../../types/ui'
import Modal from '../../ui/Modal'
import CategoryTravelTable from './CategoryTravelTable'

function ModalCategoryTable({
  isOpen,
  onCloseModal,
  itemCategory
}: ModalProps) {
  const handleCategorySelect = (category: CategoryItem) => {
    if (itemCategory) itemCategory(category)
  }

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal} width="max-w-4xl">
      <h2 className="text-lg font-semibold mb-4">Choose Categories</h2>
      <CategoryTravelTable itemCategory={handleCategorySelect} />
    </Modal>
  )
}

export default ModalCategoryTable
