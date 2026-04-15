const DEFAULT_GITHUB_API_BASE_URL = 'https://api.github.com'
const GITHUB_API_BASE_URL =
  import.meta.env.VITE_GITHUB_API_BASE_URL ?? DEFAULT_GITHUB_API_BASE_URL

interface GithubErrorResponse {
  message?: string
  documentation_url?: string
}

export class ApiError extends Error {
  public readonly status: number

  public constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function githubRequest<T>(path: string): Promise<T> {
  const response = await fetch(`${GITHUB_API_BASE_URL}${path}`, {
    headers: {
      Accept: 'application/vnd.github+json',
    },
  })

  if (!response.ok) {
    let message = 'GitHub API request failed'

    try {
      const errorBody = (await response.json()) as GithubErrorResponse
      if (errorBody.message) {
        message = errorBody.message
      }
    } catch {
      message = `Request failed with status ${response.status}`
    }

    if (response.status === 403) {
      message =
        'GitHub API rate limit exceeded. Please wait a bit and try again.'
    }

    throw new ApiError(message, response.status)
  }

  return (await response.json()) as T
}

