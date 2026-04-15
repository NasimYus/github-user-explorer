import { ErrorBoundary } from 'react-error-boundary'
import type { FallbackProps } from 'react-error-boundary'
import type { ReactNode } from 'react'
import { ApiError } from '../shared/api/githubClient'

interface AppErrorBoundaryProps {
  children: ReactNode
}

export function AppErrorBoundary({ children }: AppErrorBoundaryProps) {
  return (
    <ErrorBoundary
      FallbackComponent={AppErrorFallback}
      onError={(error, info) => {
        console.error('Unhandled application error:', error, info)
      }}
    >
      {children}
    </ErrorBoundary>
  )
}

function AppErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const message =
    error instanceof ApiError
      ? error.message
      : 'Something went wrong. Please try again.'

  return (
    <main className="page">
      <section className="inline-error" role="alert">
        <h1>Unable to render the page</h1>
        <p>{message}</p>
        <button type="button" className="button" onClick={resetErrorBoundary}>
          Try again
        </button>
      </section>
    </main>
  )
}


