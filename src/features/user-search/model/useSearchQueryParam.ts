import { useSearchParams } from 'react-router-dom'

const QUERY_PARAM_NAME = 'q'

export function useSearchQueryParam() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get(QUERY_PARAM_NAME) ?? ''

  const setQuery = (nextValue: string) => {
    const trimmed = nextValue.trim()
    const nextParams = new URLSearchParams(searchParams)

    if (trimmed) {
      nextParams.set(QUERY_PARAM_NAME, trimmed)
    } else {
      nextParams.delete(QUERY_PARAM_NAME)
    }

    setSearchParams(nextParams)
  }

  return {
    query,
    setQuery,
  }
}

