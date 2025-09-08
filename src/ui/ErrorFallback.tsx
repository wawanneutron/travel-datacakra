import type { FallbackProps } from 'react-error-boundary'

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <section className="p-6 text-center">
      <h1 className="text-xl font-semibold text-red-600">
        Upss.. something went wrong 😔
      </h1>
      <p className="mt-2 text-gray-700">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Try again
      </button>
    </section>
  )
}

export default ErrorFallback
