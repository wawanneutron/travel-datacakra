import { format } from 'date-fns'
import type { TravelItem } from '../../types/travel'

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
        <h2> {trip.title} </h2>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
          {trip.description}
        </p>
        <p>{format(new Date(trip.createdAt), 'dd MMM YYY')} </p>
      </div>
    </div>
  )
}

export default CardTravel
