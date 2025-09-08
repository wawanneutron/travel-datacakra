import { useSaveCategory } from '../../hooks/useCategory'
import type { ModalCategoryProps } from '../../types/ui'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import SpinnerMini from '../../ui/SpinnerMini'

function ModalCategory({
  isOpen,
  onCloseModal,
  item,
  purpose
}: ModalCategoryProps) {
  const { saveCategory, isLoading } = useSaveCategory()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const data = {
      name: formData.get('name') as string,
      description: formData.get('description') as string
    }

    console.log(data)

    saveCategory(
      {
        payload: data,
        id: item?.documentId
      },
      {
        onSuccess: () => onCloseModal()
      }
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal}>
      <h2 className="text-lg font-semibold mb-4 border-b border-primary-800 pb-2">
        {purpose === 'create' ? 'Add New' : 'Edit'} Category
      </h2>

      <form onSubmit={handleSubmit} className="py-4">
        <div className="mb-2 space-y-1">
          <label htmlFor="name" className="font-medium block">
            Name
          </label>
          <input
            defaultValue={item?.name}
            name="name"
            type="text"
            className="input w-full"
          />
        </div>

        <div className="mb-2 space-y-1">
          <label htmlFor="description" className="font-medium block">
            Description
          </label>
          <textarea
            defaultValue={item?.description}
            name="description"
            className="w-full h-24 input"
            placeholder="Write content"
          />
        </div>

        <Button disabled={isLoading}>
          <span>
            {isLoading
              ? 'Loading...'
              : purpose === 'create'
              ? 'Submit'
              : 'Update'}
          </span>
          {isLoading && <SpinnerMini />}
        </Button>
      </form>
    </Modal>
  )
}

export default ModalCategory
