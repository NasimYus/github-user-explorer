interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <label className="search-input-wrap">
      <span className="search-label">Search GitHub users</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="e.g. gaearon"
        className="search-input"
        type="search"
      />
    </label>
  )
}

