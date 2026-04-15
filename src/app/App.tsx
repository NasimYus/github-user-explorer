import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './AppRouter'
import { AppErrorBoundary } from './ErrorBoundary'
import { queryClient } from './queryClient'
import './styles.css'

export function App() {
  return (
    <AppErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </QueryClientProvider>
    </AppErrorBoundary>
  )
}

