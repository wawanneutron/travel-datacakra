import TravelList from '../features/travel/TravelList'

export default function Travel() {
  return (
    <>
      <div className="my-4">
        <h1 className="text-accent-500 text-3xl font-mono">See all Travel</h1>
        <p className="text-gray-400 max-w-3xl italic">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni ipsum
          minus optio provident, cumque molestias asperiores laudantium
          voluptatem dolores cum numquam, nam unde aliquid eos velit inventore
          animi id sunt?
        </p>
      </div>

      <TravelList />
    </>
  )
}
