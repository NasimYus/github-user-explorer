export interface GithubUserShort {
  id: number
  login: string
  avatar_url: string
  html_url: string
}

export interface GithubSearchUsersResponse {
  total_count: number
  incomplete_results: boolean
  items: GithubUserShort[]
}

export interface GithubUserProfile {
  id: number
  login: string
  avatar_url: string
  html_url: string
  name: string | null
  bio: string | null
  followers: number
}

export interface GithubRepo {
  id: number
  name: string
  html_url: string
  description: string | null
  stargazers_count: number
  language: string | null
}

