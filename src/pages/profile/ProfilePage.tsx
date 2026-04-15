import { Suspense } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUserProfileData } from '../../features/user-profile/model/useUserProfileData'
import { RepoList } from '../../features/user-profile/ui/RepoList'
import { UserProfileCard } from '../../features/user-profile/ui/UserProfileCard'
import { InlineError } from '../../shared/ui/InlineError'
import { ProfileSkeleton } from '../../widgets/skeletons/ProfileSkeleton'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { username } = useParams<{ username: string }>()

  if (!username) {
    return (
      <InlineError
        title="Profile not found"
        message="We could not determine which user profile to open."
      />
    )
  }

  return (
    <main className="page">
      <button type="button" className="button back-button" onClick={() => navigate(-1)}>
        Back to search
      </button>

      <Suspense fallback={<ProfileSkeleton />}>
        <ProfilePageContent username={username} />
      </Suspense>
    </main>
  )
}

interface ProfilePageContentProps {
  username: string
}

function ProfilePageContent({ username }: ProfilePageContentProps) {
  const { profile, repos } = useUserProfileData(username)

  return (
    <div className="profile-page">
      <UserProfileCard profile={profile} />
      <RepoList repos={repos} />
    </div>
  )
}

