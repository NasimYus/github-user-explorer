import { useEffect } from 'react'
import type { RefObject } from 'react'

interface UseIntersectionObserverParams {
  targetRef: RefObject<Element | null>
  enabled: boolean
  onIntersect: () => void
  rootMargin?: string
}

export function useIntersectionObserver({
  targetRef,
  enabled,
  onIntersect,
  rootMargin = '0px',
}: UseIntersectionObserverParams) {
  useEffect(() => {
    const element = targetRef.current

    if (!enabled || !element) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          onIntersect()
        }
      },
      { rootMargin },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [enabled, onIntersect, rootMargin, targetRef])
}


