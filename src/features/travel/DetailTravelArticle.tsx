import { FaClock, FaUser } from 'react-icons/fa6'
import { useParams } from 'react-router-dom'
import { useArticleDetail } from '../../hooks/useArticleDetail'
import Spinner from '../../ui/Spinner'
import { formatDate } from '../../utils'
import CommentArticle from './CommentArticle'
import PageNotFound from '../../pages/PageNotFound'

function DetailTravelArticle() {
  const { detailId } = useParams<{ detailId: string }>()
  const { article, isLoading } = useArticleDetail(detailId)

  if (isLoading) return <Spinner />
  if (!article) return <PageNotFound />

  return (
    <div className="max-w-4xl mx-auto py-8">
      {article?.cover_image_url && (
        <img
          src={article.cover_image_url}
          alt={article.title}
          title={article.title}
          loading="lazy"
          decoding="async"
          className="w-full h-80 object-cover rounded-lg shadow-md"
          onError={(e) =>
            ((e.currentTarget as HTMLImageElement).src = '/broken-image.png')
          }
        />
      )}

      <h1 className="mt-6 text-2xl sm:text-4xl font-bold text-primary-100">
        {article?.title}
      </h1>

      <div className="flex items-center gap-4 my-4">
        <div className="flex items-center gap-4">
          <img
            src="https://i.pravatar.cc/300"
            alt="avatar"
            loading="lazy"
            decoding="async"
            className="w-8 h-8 rounded-full"
          />
          <p className="flex items-center gap-1 text-sm text-primary-400">
            <FaUser />
            {article?.user.username}
          </p>
        </div>
        <p className="flex items-center gap-1 text-sm text-primary-400">
          <FaClock />
          {formatDate(article?.publishedAt || '')}
        </p>
        <p className="px-2 bg-accent-600 text-accent-100 text-sm capitalize rounded-full inline-block">
          {article?.category?.name}
        </p>
      </div>

      <div className="mt-6 text-lg text-justify leading-relaxed text-primary-200">
        {article?.description}
      </div>

      {detailId && (
        <CommentArticle
          comments={article?.comments ?? []}
          detailId={detailId}
        />
      )}
    </div>
  )
}

export default DetailTravelArticle
