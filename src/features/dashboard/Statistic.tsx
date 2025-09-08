import { useCategories } from '../../hooks/useCategories'
import { useComments } from '../../hooks/useComment'
import { useTripArticles } from '../../hooks/useTripArticles'
import Spinner from '../../ui/Spinner'

function Statistic() {
  const { articles, isLoading: isLoadingArticles } = useTripArticles()
  const { categories, isLoading: isLoadingCategories } = useCategories()
  const { comments, isLoading: isLoadingComments } = useComments()

  const totalArticles = articles?.totalItems
  const totalCategories = categories?.totalItems
  const totalComments = comments?.totalItems

  const cardStatistics = [
    {
      text: 'Total Articles',
      total: totalArticles
    },
    {
      text: 'Total Categories',
      total: totalCategories
    },
    {
      text: 'Total Comments',
      total: totalComments
    }
  ]

  if (isLoadingArticles || isLoadingCategories || isLoadingComments)
    return <Spinner />

  return (
    <div className="my-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cardStatistics.map((item) => (
          <div className="border border-primary-800 bg-primary-900 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{item.text}</h2>
            <p className="text-3xl text-accent-500 font-bold">{item.total}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Statistic
