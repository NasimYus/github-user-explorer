export const queryKeys = {
  users: {
    search: (query: string) => ['users', 'search', query] as const,
    detail: (username: string) => ['users', 'detail', username] as const,
    repos: (username: string) => ['users', 'repos', username] as const,
  },
}

