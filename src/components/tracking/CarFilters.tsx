interface CarFiltersProps {
  searchTerm: string
  onSearchTermChange: (term: string) => void
}

export default function CarFilters({
  searchTerm,
  onSearchTermChange
}: CarFiltersProps) {
  return (
    <div className="mb-4 flex gap-2">
      <input
        type="text"
        placeholder="차량번호 또는 모델명 검색"
        value={searchTerm}
        onChange={e => onSearchTermChange(e.target.value)}
        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
      />
    </div>
  )
}
