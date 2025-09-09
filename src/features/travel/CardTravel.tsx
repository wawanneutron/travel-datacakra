import { FaClock } from 'react-icons/fa6'
import type { TravelItem } from '../../types/travel'
import { formatDate } from '../../utils'

interface CardTravelProps {
  trip: TravelItem
  detailTrip: () => void
}

function CardTravel({ trip, detailTrip }: CardTravelProps) {
  return (
    <div
      onClick={detailTrip}
      className="rounded-lg overflow-hidden shadow-sm border border-primary-800 bg-primary-900 hover:bg-primary-800 cursor-pointer"
    >
      <div className="p-2">
        <img
          src={trip.cover_image_url}
          title={trip.title}
          alt={trip.title}
          loading="lazy"
          decoding="async"
          className="w-full h-48 object-cover rounded-lg mb-4"
          onError={(e) =>
            ((e.currentTarget as HTMLImageElement).src = '/broken-image.png')
          }
        />
        <h2 className="text-muted-foreground line-clamp-2 mb-2">
          {trip.title}
        </h2>
        <p className="text-sm text-primary-400 text-muted-foreground line-clamp-2 mt-1">
          {trip.description}
        </p>
        <p className="flex items-center gap-2 text-sm text-primary-500 mt-2">
          <FaClock />
          {formatDate(trip?.publishedAt || '')}
        </p>
      </div>
    </div>
  )
}

export default CardTravel
