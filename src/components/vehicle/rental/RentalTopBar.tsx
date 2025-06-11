import { VehicleStatus } from '@/types/vehicle'

interface RentalTopBarProps {
  search: string
  setSearch: (value: string) => void
  filter: string
  setFilter: (value: string) => void
}

const inputStyles = 'rounded border border-gray-300 bg-white px-3 py-2 text-sm'

const statusOptions = [
  { value: VehicleStatus.OPERABLE, label: '이용가능' },
  { value: VehicleStatus.UNDER_INSPECTION, label: '점검중' },
  { value: VehicleStatus.DAMAGED, label: '고장' }
]

export default function RentalTopBar({
  search,
  setSearch,
  filter,
  setFilter
}: RentalTopBarProps) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <h2 className="text-xl font-bold">차량 대여/회수</h2>
      <div className="flex items-center gap-4">
        <div className="relative">
          <label
            htmlFor="vehicle-search"
            className="sr-only">
            차량번호 검색
          </label>
          <input
            id="vehicle-search"
            className={`${inputStyles} ml-8`}
            placeholder="차량번호 검색"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="relative">
          <label
            htmlFor="status-filter"
            className="sr-only">
            상태 필터
          </label>
          <select
            id="status-filter"
            className={inputStyles}
            value={filter}
            onChange={e => setFilter(e.target.value)}>
            <option value="">상태 필터</option>
            {statusOptions.map(option => (
              <option
                key={option.value}
                value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
