import TravelList from '../features/travel/TravelList'

export default function Travel() {
  return (
    <>
      <div className="my-4">
        <h1 className="text-accent-500 text-3xl font-mono">
          See all Article Travel
        </h1>
        <p className="text-gray-400 max-w-3xl italic">
          From mountain adventures to seaside escapes, read articles that bring
          you closer to the world’s most amazing places.
        </p>
      </div>

      <TravelList />
    </>
  )
}
