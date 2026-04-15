import { Suspense, useEffect, useLayoutEffect, useState } from 'react'
import { SearchInput } from '../../features/user-search/ui/SearchInput'
import { UsersInfiniteList } from '../../features/user-search/ui/UsersInfiniteList'
import { useSearchQueryParam } from '../../features/user-search/model/useSearchQueryParam'
import { useDebouncedValue } from '../../shared/lib/useDebouncedValue'
import { EmptyState } from '../../shared/ui/EmptyState'
import { SearchResultsSkeleton } from '../../widgets/skeletons/SearchResultsSkeleton'

const SEARCH_SCROLL_KEY = 'search-scroll-y'

export default function SearchPage() {
  const { query, setQuery } = useSearchQueryParam()
  const [inputValue, setInputValue] = useState(query)
  const debouncedQuery = useDebouncedValue(inputValue, 300)

  useEffect(() => {
    setInputValue(query)
  }, [query])

  useEffect(() => {
    if (debouncedQuery.trim() !== query.trim()) {
      setQuery(debouncedQuery)
    }
  }, [debouncedQuery, query, setQuery])

  useLayoutEffect(() => {
    const savedScrollValue = sessionStorage.getItem(SEARCH_SCROLL_KEY)

    if (savedScrollValue) {
      window.scrollTo({ top: Number(savedScrollValue), behavior: 'auto' })
      sessionStorage.removeItem(SEARCH_SCROLL_KEY)
    }
  }, [])

  return (
    <main className="page">
      <header className="page-header">
        <h1>GitHub User Explorer</h1>
        <p>Search users and open detailed profiles with repos sorted by stars.</p>
        <SearchInput value={inputValue} onChange={setInputValue} />
      </header>

      {!query ? (
        <EmptyState
          title="Start by searching"
          description="Type a username in the search field and we will load matching users."
        />
      ) : (
        <Suspense fallback={<SearchResultsSkeleton />}>
          <UsersInfiniteList query={query} />
        </Suspense>
      )}
    </main>
  )
}

