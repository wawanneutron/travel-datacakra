import { useCategories } from '../../hooks/useCategories'
import { useTripArticles } from '../../hooks/useTripArticles'

function Statistic() {
  const { articles } = useTripArticles()
  const { categories } = useCategories()

  const totalArticles = articles?.totalItems
  const totalCategories = categories?.totalItems

  return (
    <div className="my-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-primary-800 bg-primary-900 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Articles</h2>
          <p className="text-3xl text-accent-500 font-bold">{totalArticles} </p>
        </div>
        <div className="border border-primary-800 bg-primary-900 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Categories</h2>
          <p className="text-3xl text-accent-500 font-bold">
            {totalCategories}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Statistic
