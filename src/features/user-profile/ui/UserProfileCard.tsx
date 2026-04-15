import type { GithubUserProfile } from '../../../entities/user/model/types'

interface UserProfileCardProps {
  profile: GithubUserProfile
}

export function UserProfileCard({ profile }: UserProfileCardProps) {
  return (
    <section className="profile-header">
      <img
        src={profile.avatar_url}
        alt={`${profile.login} avatar`}
        width={96}
        height={96}
      />
      <div>
        <h1>{profile.name ?? profile.login}</h1>
        <p className="profile-login">@{profile.login}</p>
        <p>{profile.bio ?? 'No bio provided.'}</p>
        <p className="profile-followers">Followers: {profile.followers}</p>
      </div>
    </section>
  )
}

