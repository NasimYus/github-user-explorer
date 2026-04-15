import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { SearchResultsSkeleton } from '../widgets/skeletons/SearchResultsSkeleton'

const SearchPage = lazy(() => import('../pages/search/SearchPage'))
const ProfilePage = lazy(() => import('../pages/profile/ProfilePage'))

export function AppRouter() {
  return (
    <Suspense fallback={<SearchResultsSkeleton />}>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/users/:username" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

