import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useSaveArticle } from '../../hooks/useArticle'
import { uploadImage } from '../../services/apiUpload'
import type { CategoryItem } from '../../types/category'
import type { ModalProps } from '../../types/ui'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import SpinnerMini from '../../ui/SpinnerMini'
import { getToken } from '../auth/authSlice'
import ModalCategoryTable from './ModalCategoryTable'
import type { ArticleFormPayload } from '../../types/travel'

function ModalArticle({ isOpen, onCloseModal, item, purpose }: ModalProps) {
  const token = useSelector(getToken)

  const { saveArticle, isPending } = useSaveArticle()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [isCategoryItem, setCategoryItem] = useState<CategoryItem>()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<ArticleFormPayload>()

  const onSubmit: SubmitHandler<ArticleFormPayload> = async (data) => {
    let imageUrl = item?.cover_image_url || ''

    try {
      const file = (data.cover_image_url as FileList)?.[0]
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

    const payload: ArticleFormPayload = {
      title: data.title,
      description: data.description,
      category: isCategoryItem?.documentId || data.category,
      cover_image_url: imageUrl
    }

    console.log('Submit payload:', payload)

    saveArticle(
      {
        payload,
        id: item?.documentId
      },
      {
        onSuccess: () => onCloseModal()
      }
    )
  }

  useEffect(() => {
    if (purpose === 'edit' && item) {
      reset({
        title: item.title || '',
        description: item.description || '',
        category: item.documentId || ''
      })
      setCategoryItem(undefined)
    }

    if (purpose === 'create') {
      reset({
        title: '',
        description: '',
        category: '',
        cover_image_url: undefined
      })
      setCategoryItem(undefined)
    }
  }, [purpose, item, reset])

  const handleOpenModal = () => setIsModalOpen(true)

  const handleCategorySelect = (category: CategoryItem) => {
    setCategoryItem(category)
    setIsModalOpen(false)
    setValue('category', category?.documentId || '')
  }

  const handleCloseModal = () => {
    onCloseModal()
    reset({
      title: '',
      description: '',
      category: '',
      cover_image_url: undefined
    })
    setCategoryItem(undefined)
  }

  const isLoading = isUploading || isPending

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} width="max-w-2xl">
      <h2 className="text-lg font-semibold mb-4 border-b border-primary-800 pb-2">
        {purpose === 'create' ? 'Add New' : 'Edit'} Article
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-1 max-h-[90vh] overflow-y-auto"
      >
        <div className="mb-2 space-y-1">
          <label htmlFor="title" className="font-medium block">
            Ttitle
          </label>
          <input
            defaultValue={item?.title}
            type="text"
            className="input w-full"
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-2 space-y-1">
          <label htmlFor="description" className="font-medium block">
            Description
          </label>
          <textarea
            defaultValue={item?.description}
            className="w-full h-24 input"
            placeholder="Write content"
            {...register('description', {
              required: 'Description is required'
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div className="mb-2 space-y-1">
          <label htmlFor="category" className="font-medium block">
            Category
          </label>
          <div className="grid grid-cols-[1fr_auto] gap-4">
            <input
              type="text"
              className="input w-full"
              defaultValue={isCategoryItem?.documentId}
              {...register('category', { required: 'Category is required' })}
            />

            <button
              type="button"
              onClick={handleOpenModal}
              className="px-1 sm:px-8 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Choose Category
            </button>
          </div>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
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
            type="file"
            accept="image/*"
            className="input w-full"
            {...register('cover_image_url', {
              validate: (files) => {
                if (purpose === 'create' && (!files || files.length === 0)) {
                  return 'Image is required'
                }
                return true
              }
            })}
          />
          {errors.cover_image_url && (
            <p className="text-red-500 text-sm">
              {errors.cover_image_url.message as string}
            </p>
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

      <ModalCategoryTable
        isOpen={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
        itemCategory={handleCategorySelect}
      />
    </Modal>
  )
}

export default ModalArticle
