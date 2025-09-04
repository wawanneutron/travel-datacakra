import { useState } from 'react'
import { HiPencil, HiTrash } from 'react-icons/hi2'
import { useTripArticles } from '../../hooks/useTripArticles'
import Pagination from '../../ui/Pagination'
import Spinner from '../../ui/Spinner'
import Button from '../../ui/Button'
import { FaPlus } from 'react-icons/fa6'

function ArticleTravelTable() {
  const [page, setPage] = useState(1)
  const { articles, isLoading } = useTripArticles(page, 8)

  console.log('articless: ', articles)

  if (isLoading) return <Spinner />

  return (
    <div className="mt-4">
      <div className="inline-block">
        <Button>
          <FaPlus />
          <span>Add Article</span>
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md mt-4">
        <table className="w-full text-left border-collapse border border-primary-700">
          <thead className="bg-primary-800 text-primary-100">
            <tr>
              <th className="px-4 py-3 border border-primary-700">ID</th>
              <th className="px-4 py-3 border border-primary-700">Title</th>
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
            {articles?.items.map((travel) => (
              <tr
                key={travel.id}
                className="odd:bg-primary-900 even:bg-primary-950 hover:bg-primary-800"
              >
                <td className="px-4 py-3 border border-primary-700">
                  {travel.id}
                </td>
                <td className="px-4 py-3 border border-primary-700 max-w-[250px] truncate">
                  {travel.title}
                </td>
                <td className="px-4 py-3 border border-primary-700 max-w-[250px] truncate">
                  {travel.description}
                </td>
                <td className="px-4 py-3 border border-primary-700">
                  {new Date(travel.createdAt).toLocaleDateString()}
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
        currentPage={articles?.page || 1}
        totalPages={articles?.totalPages || 1}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  )
}

export default ArticleTravelTable
