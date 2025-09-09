import { useForm, type SubmitHandler } from 'react-hook-form'
import { useSaveCategory } from '../../hooks/useCategory'
import type { ModalCategoryProps } from '../../types/ui'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import SpinnerMini from '../../ui/SpinnerMini'
import type { CategoryFormPayload } from '../../types/category'

function ModalCategory({
  isOpen,
  onCloseModal,
  item,
  purpose
}: ModalCategoryProps) {
  const { saveCategory, isLoading } = useSaveCategory()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CategoryFormPayload>({
    values: item
  })

  const onSubmit: SubmitHandler<CategoryFormPayload> = async (data) => {
    const payload: CategoryFormPayload = {
      name: data.name,
      description: data.description
    }

    saveCategory(
      {
        payload: payload,
        id: item?.documentId
      },
      {
        onSuccess: () => onCloseModal()
      }
    )
  }

  const handleCloseModal = () => {
    onCloseModal()
    reset({
      name: '',
      description: ''
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal}>
      <h2 className="text-lg font-semibold mb-4 border-b border-primary-800 pb-2">
        {purpose === 'create' ? 'Add New' : 'Edit'} Category
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="p-1">
        <div className="mb-2 space-y-1">
          <label htmlFor="name" className="font-medium block">
            Name
          </label>
          <input
            defaultValue={item?.name}
            type="text"
            className="input w-full placeholder:text-accent-300"
            placeholder="Write name"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-2 space-y-1">
          <label htmlFor="description" className="font-medium block">
            Description
          </label>
          <textarea
            defaultValue={item?.description}
            className="w-full h-24 input placeholder:text-accent-300"
            placeholder="Write description"
            {...register('description', {
              required: 'Description is required'
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
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
