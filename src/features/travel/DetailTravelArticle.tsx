import { useParams } from 'react-router-dom'
import { useArticleDetail } from '../../hooks/useArticleDetail'
import Spinner from '../../ui/Spinner'
import { formatDate } from '../../utils'
import CommentArticle from './CommentArticle'

function DetailTravelArticle() {
  const { detailId } = useParams<{ detailId: string }>()
  const { article, isLoading } = useArticleDetail(detailId)

  if (isLoading) return <Spinner />

  return (
    <div className="max-w-4xl mx-auto py-8">
      {article?.cover_image_url && (
        <img
          src={article.cover_image_url}
          alt={article.title}
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
      <p className="text-sm text-primary-400 mt-2">
        publish: {formatDate(article?.publishedAt || '')}
      </p>

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
