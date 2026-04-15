import { useSuspenseQueries } from '@tanstack/react-query'
import { fetchUserProfile, fetchUserRepos } from '../../../entities/user/api/userApi'
import { queryKeys } from '../../../shared/api/queryKeys'

export function useUserProfileData(username: string) {
  const [profileQuery, reposQuery] = useSuspenseQueries({
    queries: [
      {
        queryKey: queryKeys.users.detail(username),
        queryFn: () => fetchUserProfile(username),
      },
      {
        queryKey: queryKeys.users.repos(username),
        queryFn: () => fetchUserRepos(username),
      },
    ],
  })

  const sortedRepos = [...reposQuery.data].sort(
    (a, b) => b.stargazers_count - a.stargazers_count,
  )

  return {
    profile: profileQuery.data,
    repos: sortedRepos,
  }
}

