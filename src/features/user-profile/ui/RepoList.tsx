import type { GithubRepo } from '../../../entities/user/model/types'

interface RepoListProps {
  repos: GithubRepo[]
}

export function RepoList({ repos }: RepoListProps) {
  return (
    <section className="repo-section">
      <h2>Repositories</h2>

      {repos.length === 0 ? (
        <p>This user has no public repositories.</p>
      ) : (
        <ul className="repo-list">
          {repos.map((repo) => (
            <li key={repo.id} className="repo-card">
              <a href={repo.html_url} target="_blank" rel="noreferrer">
                {repo.name}
              </a>
              <p>{repo.description ?? 'No description.'}</p>
              <div className="repo-meta">
                <span>Stars: {repo.stargazers_count}</span>
                <span>{repo.language ?? 'Unknown language'}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

