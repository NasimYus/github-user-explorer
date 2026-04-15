import type {
  GithubRepo,
  GithubSearchUsersResponse,
  GithubUserProfile,
} from '../model/types'
import { githubRequest } from '../../../shared/api/githubClient'

export const USERS_PER_PAGE = 30

export async function searchUsers(
  query: string,
  page: number,
): Promise<GithubSearchUsersResponse> {
  const params = new URLSearchParams({
    q: query,
    page: String(page),
    per_page: String(USERS_PER_PAGE),
  })

  return githubRequest<GithubSearchUsersResponse>(`/search/users?${params.toString()}`)
}

export async function fetchUserProfile(
  username: string,
): Promise<GithubUserProfile> {
  return githubRequest<GithubUserProfile>(`/users/${encodeURIComponent(username)}`)
}

export async function fetchUserRepos(username: string): Promise<GithubRepo[]> {
  return githubRequest<GithubRepo[]>(`/users/${encodeURIComponent(username)}/repos?per_page=100`)
}

