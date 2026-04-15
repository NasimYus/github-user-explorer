import { SkeletonBlock } from '../../shared/ui/SkeletonBlock'

export function ProfileSkeleton() {
  return (
    <div className="profile-page">
      <section className="profile-header">
        <SkeletonBlock style={{ width: 96, height: 96, borderRadius: 999 }} />
        <div className="skeleton-column">
          <SkeletonBlock style={{ width: 200, height: 28 }} />
          <SkeletonBlock style={{ width: 120, height: 18 }} />
          <SkeletonBlock style={{ width: 320, height: 18 }} />
        </div>
      </section>

      <section className="repo-section">
        <SkeletonBlock style={{ width: 180, height: 28, marginBottom: 16 }} />
        <div className="repo-list">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="repo-card">
              <SkeletonBlock style={{ width: 180, height: 20 }} />
              <SkeletonBlock style={{ width: '100%', height: 16, marginTop: 12 }} />
              <SkeletonBlock style={{ width: 180, height: 16, marginTop: 12 }} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

