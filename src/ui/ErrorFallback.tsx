import type { FallbackProps } from 'react-error-boundary'
import Button from './Button'

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <section className="flex flex-col justify-center bg-primary-950 min-h-screen p-6 text-center">
      <h1 className="text-xl font-mono font-semibold text-red-600">
        Upss.. something went wrong 😔
      </h1>
      <p className="mt-2 text-xl text-accent-700">{`${error?.name} ${error?.message}`}</p>
      <div className="max-w-64 mx-auto">
        <Button onClick={resetErrorBoundary}>Try again</Button>
      </div>
    </section>
  )
}

export default ErrorFallback
