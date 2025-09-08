import DetailTravelArticle from '../features/travel/DetailTravelArticle'

export default function Detail() {
  return (
    <div className="my-4">
      <h1 className="text-accent-500 text-3xl font-mono">Detail Article</h1>
      <p className="text-gray-400 max-w-3xl italic">
        From mountain adventures to seaside escapes
      </p>

      <DetailTravelArticle />
    </div>
  )
}
