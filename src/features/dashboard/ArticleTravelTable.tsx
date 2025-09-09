import { useState } from 'react'
import { HiPencil, HiTrash } from 'react-icons/hi2'
import { useTripArticles } from '../../hooks/useTripArticles'
import Pagination from '../../ui/Pagination'
import Spinner from '../../ui/Spinner'
import Button from '../../ui/Button'
import { FaPlus } from 'react-icons/fa6'
import ModalArticle from './ModalArticle'
import type { TravelItem } from '../../types/travel'
import type { PurposeType } from '../../types/ui'
import ModalDelete from './ModalDelete'

function ArticleTravelTable() {
  const [page, setPage] = useState(1)
  const { articles, isLoading } = useTripArticles(page, 8)

  const [purpose, setPurpose] = useState<PurposeType>()
  const [isModalArticle, setIsModalArticle] = useState<boolean>(false)
  const [isModalDelete, setIsModalDelete] = useState<boolean>(false)
  const [articleItem, setArticleItem] = useState<TravelItem>()

  const handleModalArticle = (item?: TravelItem) => {
    setArticleItem(item)
    setIsModalArticle(true)
  }

  const handleModalDelete = (item: TravelItem) => {
    setArticleItem(item)
    setIsModalDelete(true)
  }

  if (isLoading) return <Spinner />

  return (
    <div className="mt-4">
      <div className="inline-block">
        <Button
          onClick={() => {
            handleModalArticle()
            setPurpose('create')
          }}
        >
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
              <th className="px-4 py-3 border border-primary-700">Category</th>
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
                <td className="px-4 py-3 border border-primary-700 max-w-[250px] truncate">
                  {travel.category?.name ?? '-'}
                </td>
                <td className="px-4 py-3 border border-primary-700">
                  {new Date(travel.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 border border-primary-700 max-w-[120px]">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        handleModalArticle(travel)
                        setPurpose('edit')
                      }}
                      className="flex items-center gap-2 h-10 p-2 border border-accent-700"
                    >
                      <HiPencil />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleModalDelete(travel)}
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
        currentPage={articles?.page || 1}
        totalPages={articles?.totalPages || 1}
        onPageChange={(newPage) => setPage(newPage)}
      />

      <ModalArticle
        purpose={purpose}
        item={articleItem}
        isOpen={isModalArticle}
        onCloseModal={() => setIsModalArticle(false)}
      />

      <ModalDelete
        isOpen={isModalDelete}
        TypeDelete="article"
        documentId={articleItem?.documentId}
        onCloseModal={() => setIsModalDelete(false)}
      />
    </div>
  )
}

export default ArticleTravelTable
