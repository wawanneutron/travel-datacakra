import { Link } from 'react-router-dom'
import bg from '../../public/bg.webp'

export default function Home() {
  return (
    <main>
      <img
        src={bg}
        alt="bg-travel"
        loading="lazy"
        decoding="async"
        className="absolute h-full w-full -mt-32 object-cover object-top"
      />

      <div className="flex flex-col items-center justify-center relative z-10 text-center h-[80vh]">
        <h1 className="font-mono text-8xl capitalize text-primary-50 mb-10 tracking-tight font-normal">
          Explore <br /> the beautiful place.
        </h1>
        <Link
          to="/travel-list"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Find Your Next Adventure
        </Link>
      </div>
    </main>
  )
}
