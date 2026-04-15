import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { searchUsers, USERS_PER_PAGE } from '../../../entities/user/api/userApi'
import { queryKeys } from '../../../shared/api/queryKeys'

interface SearchPageResponse {
  items: Awaited<ReturnType<typeof searchUsers>>['items']
  totalCount: number
  nextPage: number | null
}

export function useSearchUsersInfiniteQuery(query: string) {
  const normalizedQuery = query.trim()

  return useSuspenseInfiniteQuery({
    queryKey: queryKeys.users.search(normalizedQuery),
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const response = await searchUsers(normalizedQuery, pageParam)
      const loadedCount = pageParam * USERS_PER_PAGE
      const hasNextPage =
        response.items.length === USERS_PER_PAGE && loadedCount < response.total_count

      return {
        items: response.items,
        totalCount: response.total_count,
        nextPage: hasNextPage ? pageParam + 1 : null,
      } satisfies SearchPageResponse
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
  })
}

