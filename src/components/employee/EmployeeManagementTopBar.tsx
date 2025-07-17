interface EmployeeManagementTopBarProps {
  filter: 'all' | 'reserved' | 'not_reserved'
  onFilterChange: (filter: 'all' | 'reserved' | 'not_reserved') => void
  search: string
  onSearchChange: (search: string) => void
}

const FILTER_LABELS = {
  all: '전체',
  reserved: '예약됨',
  not_reserved: '미예약'
}

export default function EmployeeManagementTopBar({
  filter,
  onFilterChange,
  search,
  onSearchChange
}: EmployeeManagementTopBarProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        사원 차량 할당
      </h1>
      <div className="flex gap-2">
        <input
          type="text"
          className="input"
          placeholder="이름을 입력해주세요"
          value={search}
          onChange={e => onSearchChange(e.target.value)}
        />
        {(['all', 'reserved', 'not_reserved'] as const).map(type => (
          <button
            key={type}
            className={`btn ${filter === type ? 'btn-success' : 'btn-outline'}`}
            onClick={() => onFilterChange(type)}>
            {FILTER_LABELS[type]}
          </button>
        ))}
      </div>
    </div>
  )
}
