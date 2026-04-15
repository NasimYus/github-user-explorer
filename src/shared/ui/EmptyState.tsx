interface EmptyStateProps {
  title: string
  description: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="empty-state" role="status" aria-live="polite">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}

