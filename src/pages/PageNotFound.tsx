import { Link } from 'react-router-dom'

export default function PageNotFound() {
  return (
    <section className="flex flex-col justify-center items-center h-[80vh]">
      <h1 className="text-3xl mb-4">Uppss Page Not Found 😢</h1>
      <Link to="/" className="underline hover:text-accent-500">
        &larr; Go back
      </Link>
    </section>
  )
}
