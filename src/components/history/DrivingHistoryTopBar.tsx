import type { DrivingHistoryFilter } from '@/types/drivingHistory'

interface TopBarProps {
  filter: DrivingHistoryFilter
  setFilter: (f: DrivingHistoryFilter) => void
  onSearch: () => void
}
const DrivingHistoryTopBar = ({ filter, setFilter, onSearch }: TopBarProps) => (
  <div className="mb-4 flex items-center justify-between">
    <h1 className="text-2xl font-bold text-gray-800">운행일지</h1>
    <div className="flex items-center gap-3">
      <input
        type="date"
        value={filter.from.slice(0, 10)}
        onChange={e =>
          setFilter({ ...filter, from: e.target.value + 'T00:00:00' })
        }
        className="rounded border border-gray-300 bg-white px-3 py-3 text-sm"
      />
      <input
        type="date"
        value={filter.to.slice(0, 10)}
        onChange={e =>
          setFilter({ ...filter, to: e.target.value + 'T23:59:59' })
        }
        className="rounded border border-gray-300 bg-white px-3 py-3 text-sm"
      />
      <input
        type="text"
        placeholder="운전자명"
        value={filter.driverName}
        onChange={e => setFilter({ ...filter, driverName: e.target.value })}
        className="min-w-20 rounded border border-gray-300 bg-white px-3 py-3 text-sm"
      />
      <button
        className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        type="button"
        onClick={onSearch}>
        검색
      </button>
    </div>
  </div>
)
export default DrivingHistoryTopBar
