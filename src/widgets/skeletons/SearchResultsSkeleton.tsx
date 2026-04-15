import { SkeletonBlock } from '../../shared/ui/SkeletonBlock'

export function SearchResultsSkeleton() {
  return (
    <ul className="user-list" aria-label="Loading users">
      {Array.from({ length: 8 }).map((_, index) => (
        <li key={index} className="user-card user-card-skeleton">
          <SkeletonBlock style={{ width: 56, height: 56, borderRadius: 999 }} />
          <div className="skeleton-column">
            <SkeletonBlock style={{ width: 140, height: 20 }} />
            <SkeletonBlock style={{ width: 120, height: 16 }} />
          </div>
          <SkeletonBlock style={{ width: 104, height: 36, borderRadius: 8 }} />
        </li>
      ))}
    </ul>
  )
}

