import { useQueryClient } from '@tanstack/react-query'
import { useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  fetchUserProfile,
  fetchUserRepos,
} from '../../../entities/user/api/userApi'
import type { GithubUserShort } from '../../../entities/user/model/types'
import { queryKeys } from '../../../shared/api/queryKeys'
import { useIntersectionObserver } from '../../../shared/lib/useIntersectionObserver'
import { EmptyState } from '../../../shared/ui/EmptyState'
import { useSearchUsersInfiniteQuery } from '../model/useSearchUsersInfiniteQuery'

interface UsersInfiniteListProps {
  query: string
}

export function UsersInfiniteList({ query }: UsersInfiniteListProps) {
  const queryClient = useQueryClient()
  const sentinelRef = useRef<HTMLDivElement>(null)

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useSearchUsersInfiniteQuery(query)

  const users = useMemo(
    () => data.pages.flatMap((page) => page.items),
    [data.pages],
  )

  useIntersectionObserver({
    targetRef: sentinelRef,
    enabled: hasNextPage && !isFetchingNextPage,
    onIntersect: () => {
      void fetchNextPage()
    },
    rootMargin: '280px',
  })

  if (users.length === 0) {
    return (
      <EmptyState
        title="No users found"
        description="Try another query, for example octocat or gaearon."
      />
    )
  }

  const prefetchUser = (username: string) => {
    void queryClient.prefetchQuery({
      queryKey: queryKeys.users.detail(username),
      queryFn: () => fetchUserProfile(username),
    })

    // Prefetch repositories too so profile page opens instantly more often.
    void queryClient.prefetchQuery({
      queryKey: queryKeys.users.repos(username),
      queryFn: () => fetchUserRepos(username),
    })
  }

  return (
    <>
      <ul className="user-list" aria-label="GitHub users">
        {users.map((user) => (
          <UserListItem key={user.id} user={user} onHover={prefetchUser} />
        ))}
      </ul>

      {hasNextPage ? (
        <div ref={sentinelRef} className="sentinel" aria-hidden="true">
          {isFetchingNextPage ? 'Loading more users...' : ''}
        </div>
      ) : (
        <p className="list-end">You reached the end of the results.</p>
      )}
    </>
  )
}

interface UserListItemProps {
  user: GithubUserShort
  onHover: (username: string) => void
}

function UserListItem({ user, onHover }: UserListItemProps) {
  const handleOpenProfile = () => {
    sessionStorage.setItem('search-scroll-y', String(window.scrollY))
  }

  return (
    <li className="user-card" onMouseEnter={() => onHover(user.login)}>
      <img src={user.avatar_url} width={56} height={56} alt={`${user.login} avatar`} />
      <div>
        <h3>{user.login}</h3>
        <a href={user.html_url} target="_blank" rel="noreferrer">
          Open on GitHub
        </a>
      </div>
      <Link
        to={`/users/${user.login}`}
        onClick={handleOpenProfile}
        className="button secondary"
      >
        View profile
      </Link>
    </li>
  )
}

