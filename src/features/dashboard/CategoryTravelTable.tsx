import { useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { HiPencil, HiTrash } from 'react-icons/hi2'
import { useCategories } from '../../hooks/useCategories'
import type { CategoryItem } from '../../types/category'
import Button from '../../ui/Button'
import Pagination from '../../ui/Pagination'
import Spinner from '../../ui/Spinner'
import ModalDelete from './ModalDelete'
import ModalCategory from './ModalCategory'
import type { PurposeType } from '../../types/ui'

interface CategoryTableProps {
  hidden?: boolean
  itemCategory?: (category: CategoryItem) => void
}

function CategoryTravelTable({ hidden, itemCategory }: CategoryTableProps) {
  const [page, setPage] = useState(1)
  const { categories, isLoading } = useCategories(page, 8)

  const [purpose, setPurpose] = useState<PurposeType>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isModalDelete, setIsModalDelete] = useState<boolean>(false)
  const [categoryItem, setCategoryItem] = useState<CategoryItem>()

  const handleOpenModal = (category?: CategoryItem) => {
    console.log('open: ', category)
    setCategoryItem(category)
    setIsModalOpen(true)
  }

  const handleModalDelete = (category?: CategoryItem) => {
    setCategoryItem(category)
    setIsModalDelete(true)
  }

  const handleChooseCategory = (category: CategoryItem) => {
    if (itemCategory) itemCategory(category)
  }

  if (isLoading) return <Spinner />

  return (
    <div className="mt-4">
      {hidden && (
        <div className="inline-block">
          <Button
            onClick={() => {
              handleOpenModal()
              setPurpose('create')
            }}
          >
            <FaPlus />
            <span>Add Category</span>
          </Button>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg shadow-md mt-4">
        <table className="w-full text-left border-collapse border border-primary-700">
          <thead className="bg-primary-800 text-primary-100">
            <tr>
              <th className="px-4 py-3 border border-primary-700">ID</th>
              <th className="px-4 py-3 border border-primary-700">Name</th>
              <th className="px-4 py-3 border border-primary-700">
                Description
              </th>
              <th className="px-4 py-3 border border-primary-700">
                Created At
              </th>
              {hidden && (
                <th className="px-4 py-3 border border-primary-700">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {categories?.items.map((category) => (
              <tr
                key={category.id}
                className="odd:bg-primary-900 even:bg-primary-950 hover:bg-primary-800 cursor-pointer"
                onClick={() => handleChooseCategory(category)}
              >
                <td className="px-4 py-3 border border-primary-700">
                  {category.id}
                </td>
                <td className="px-4 py-3 border border-primary-700 max-w-[250px] truncate">
                  {category.name}
                </td>
                <td className="px-4 py-3 border border-primary-700 max-w-[250px] truncate">
                  {category.description}
                </td>
                <td className="px-4 py-3 border border-primary-700">
                  {new Date(category.createdAt).toLocaleDateString()}
                </td>
                {hidden && (
                  <td className="px-4 py-3 border border-primary-700 max-w-[120px]">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          handleOpenModal(category)
                          setPurpose('edit')
                        }}
                        className="flex items-center gap-2 h-10 p-2 border border-accent-700"
                      >
                        <HiPencil />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleModalDelete(category)}
                        className="flex items-center gap-2 h-10 p-2 border border-accent-700"
                      >
                        <HiTrash />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={categories?.page || 1}
        totalPages={categories?.totalPages || 1}
        onPageChange={(newPage) => setPage(newPage)}
      />

      <ModalCategory
        item={categoryItem}
        purpose={purpose}
        isOpen={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
      />

      <ModalDelete
        isOpen={isModalDelete}
        TypeDelete="category"
        documentId={categoryItem?.documentId}
        onCloseModal={() => setIsModalDelete(false)}
      />
    </div>
  )
}

export default CategoryTravelTable
