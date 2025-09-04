import { useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { HiPencil, HiTrash } from 'react-icons/hi2'
import { useCategories } from '../../hooks/useCategories'
import Button from '../../ui/Button'
import Pagination from '../../ui/Pagination'
import Spinner from '../../ui/Spinner'

function CategoryTravelTable() {
  const [page, setPage] = useState(1)
  const { categories, isLoading } = useCategories(page, 8)

  if (isLoading) return <Spinner />

  return (
    <div className="mt-4">
      <div className="inline-block">
        <Button>
          <FaPlus />
          <span>Add Category</span>
        </Button>
      </div>

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
              <th className="px-4 py-3 border border-primary-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories?.items.map((category) => (
              <tr
                key={category.id}
                className="odd:bg-primary-900 even:bg-primary-950 hover:bg-primary-800"
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
                <td className="px-4 py-3 border border-primary-700 max-w-[120px]">
                  <div className="flex items-center justify-center gap-2">
                    <button className="flex items-center gap-2 h-10 p-2 border border-accent-700">
                      <HiPencil />
                      <span>Edit</span>
                    </button>
                    <button className="flex items-center gap-2 h-10 p-2 border border-accent-700">
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

      {/* Pagination */}
      <Pagination
        currentPage={categories?.page || 1}
        totalPages={categories?.totalPages || 1}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  )
}

export default CategoryTravelTable
