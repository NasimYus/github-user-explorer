# GitHub User Explorer

Production-ready React + TypeScript app for searching GitHub users and viewing profile details.

## Stack

- React 19
- TypeScript (strict mode)
- Vite
- `@tanstack/react-query` v5 with Suspense APIs
- `react-router-dom`
- `react-error-boundary`

## Implemented Features

- User search with 300ms debounce
- Infinite user list with `useSuspenseInfiniteQuery`
- User profile page with parallel profile + repos loading via `useSuspenseQueries`
- Repositories sorted by stars in descending order
- Prefetch profile and repos on user-card hover
- Back navigation with preserved search query and restored scroll position
- Global error boundary with readable error messages
- Skeleton loaders for search and profile pages
- Code-split pages via `React.lazy`

## Architecture

```text
src/
  app/                  # app bootstrap: providers, router, global styles
  pages/                # route-level pages
  features/             # user-facing scenarios (search/profile)
  entities/             # domain entities and API methods
  shared/               # reusable API client, query keys, hooks, UI
  widgets/              # reusable composed UI blocks (skeleton sets)
```

### Key decisions

- **Centralized query keys** in `src/shared/api/queryKeys.ts` for stable cache keys.
- **Separated API layer**:
  - low-level HTTP logic in `src/shared/api/githubClient.ts`
  - user-specific requests in `src/entities/user/api/userApi.ts`
- **Suspense-first data loading**:
  - no `isLoading` states are used
  - each page has its own Suspense boundary and fallback skeleton
- **Parallel profile loading** with `useSuspenseQueries` for better latency.
- **Global functional Error Boundary** is implemented via `react-error-boundary` in `src/app/ErrorBoundary.tsx`.

## React Query Cache Strategy

Configured in `src/app/queryClient.ts`:

- `staleTime: 60_000` (1 minute)
- `gcTime: 300_000` (5 minutes)

### Why these values

- 1 minute stale time reduces repeated requests while users browse between results and profiles.
- 5 minutes GC keeps data for quick back-and-forth navigation without retaining cache for too long.

## Tradeoffs

- GitHub unauthenticated API is rate-limited; the app shows readable errors but does not yet include OAuth/token support.
- Infinite scroll uses IntersectionObserver for simplicity; virtualization is not added because list items are lightweight.
- Repos request uses `per_page=100`, so users with more than 100 repos are partially represented.

## Run Locally

Create `.env` from `.env.example` if you want to override API base URL:

```bash
cp .env.example .env
```

Available variable:

- `VITE_GITHUB_API_BASE_URL` (default: `https://api.github.com`)

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

This repository is configured for automatic deployment via GitHub Actions.

- Workflow: `.github/workflows/deploy-pages.yml`
- Trigger: push to `main`
- Production URL: `https://nasimyus.github.io/github-user-explorer/`

Enable it once in GitHub:

1. Open repository **Settings** -> **Pages**.
2. In **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from **Actions**).

