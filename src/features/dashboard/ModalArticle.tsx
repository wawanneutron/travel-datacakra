import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useSaveArticle } from '../../hooks/useArticle'
import { uploadImage } from '../../services/apiUpload'
import type { CategoryItem } from '../../types/category'
import type { ModalProps } from '../../types/ui'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import SpinnerMini from '../../ui/SpinnerMini'
import { getToken } from '../auth/authSlice'
import ModalCategoryTable from './ModalCategoryTable'

function ModalArticle({ isOpen, onCloseModal, item, purpose }: ModalProps) {
  const token = useSelector(getToken)

  const { saveArticle, isPending } = useSaveArticle()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [isCategoryItem, setCategoryItem] = useState<CategoryItem>()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const file = formData.get('cover_image_url') as File
    let imageUrl = ''

    try {
      if (file && file.size > 0) {
        setIsUploading(true)

        const uploaded = await uploadImage(file, token!)
        imageUrl = uploaded.url
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsUploading(false)
    }

    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      category: isCategoryItem?.documentId as string,
      cover_image_url: imageUrl || (item?.cover_image_url as string)
    }

    console.log(data)

    saveArticle(
      {
        payload: data,
        id: item?.documentId
      },
      {
        onSuccess: () => onCloseModal()
      }
    )
  }

  const handleOpenModal = () => setIsModalOpen(true)

  const handleCategorySelect = (category: CategoryItem) => {
    setCategoryItem(category)
    setIsModalOpen(false)
  }

  const isLoading = isUploading || isPending

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal}>
      <h2 className="text-lg font-semibold mb-4 border-b border-primary-800 pb-2">
        {purpose === 'create' ? 'Add New' : 'Edit'} Article
      </h2>

      <form
        onSubmit={handleSubmit}
        className="py-4 max-h-[90vh] overflow-y-auto"
      >
        <div className="mb-2 space-y-1">
          <label htmlFor="title" className="font-medium block">
            Ttitle
          </label>
          <input
            defaultValue={item?.title}
            name="title"
            type="text"
            className="input w-full"
          />
        </div>

        <div className="mb-2 space-y-1">
          <label htmlFor="description" className="font-medium block">
            Description
          </label>
          <input
            defaultValue={item?.description}
            name="description"
            type="text"
            className="input w-full"
          />
        </div>

        <div className="mb-2 space-y-1">
          <label htmlFor="category" className="font-medium block">
            Category
          </label>
          <div className="flex justify-between items-center gap-2">
            <input
              defaultValue={item?.documentId}
              value={isCategoryItem?.documentId}
              name="category"
              type="text"
              className="input w-72"
              disabled
            />

            <button
              type="button"
              onClick={handleOpenModal}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Choose Category
            </button>
          </div>
        </div>

        <div className="mb-2 space-y-1">
          <label htmlFor="cover_image_url" className="font-medium block">
            Image
          </label>
          {purpose === 'edit' && (
            <img
              className="mb-2 h-40 w-full object-cover py-2"
              src={item?.cover_image_url}
              alt={item?.title}
              title={item?.title}
              loading="lazy"
              decoding="async"
            />
          )}
          <input
            name="cover_image_url"
            type="file"
            accept="image/*"
            className="input w-full"
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

      <ModalCategoryTable
        isOpen={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
        itemCategory={handleCategorySelect}
      />
    </Modal>
  )
}

export default ModalArticle
