import { useNavigate } from 'react-router-dom'
import { useTripArticles } from '../../hooks/useTripArticles'
import type { TravelItem } from '../../types/travel'
import Spinner from '../../ui/Spinner'
import CardTravel from './CardTravel'
import { FaArrowDown } from 'react-icons/fa6'

function TravelList() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useTripArticles()

  const navigate = useNavigate()
  const onDetailTrip = () => navigate('/login')

  if (isLoading) return <Spinner />

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.pages.map((page) =>
          page.items.map((travel: TravelItem) => (
            <CardTravel
              key={travel.id}
              trip={travel}
              detailTrip={onDetailTrip}
            />
          ))
        )}
      </div>

      <div className="flex justify-center items-center">
        {hasNextPage && !isFetchingNextPage && (
          <button
            onClick={() => fetchNextPage()}
            className="flex items-center font-mono text-lg gap-2 my-10 px-8 py-4 bg-primary-800 text-accent-300"
          >
            <span>Load More</span>
            <FaArrowDown />
          </button>
        )}

        {isFetchingNextPage && <Spinner />}

        {!hasNextPage && (
          <p className="text-lg py-6 text-center text-accent-500">
            No more data trip...
          </p>
        )}
      </div>
    </div>
  )
}

export default TravelList
