interface InlineErrorProps {
  title: string
  message: string
  onRetry?: () => void
}

export function InlineError({ title, message, onRetry }: InlineErrorProps) {
  return (
    <section className="inline-error" role="alert">
      <h2>{title}</h2>
      <p>{message}</p>
      {onRetry ? (
        <button type="button" className="button" onClick={onRetry}>
          Try again
        </button>
      ) : null}
    </section>
  )
}

