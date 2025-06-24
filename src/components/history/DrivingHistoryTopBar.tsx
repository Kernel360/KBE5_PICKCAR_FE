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
        className="input rounded border px-3 py-3 text-sm"
      />
      <input
        type="date"
        value={filter.to.slice(0, 10)}
        onChange={e =>
          setFilter({ ...filter, to: e.target.value + 'T23:59:59' })
        }
        className="input rounded border px-3 py-3 text-sm"
      />
      <input
        type="text"
        placeholder="운전자명"
        value={filter.driverName}
        onChange={e => setFilter({ ...filter, driverName: e.target.value })}
        className="input min-w-10 rounded border px-3 py-3 text-sm"
      />
      <button
        className="btn btn-outline btn-default rounded border px-4 py-2 text-sm font-semibold"
        type="button"
        onClick={onSearch}>
        검색
      </button>
    </div>
  </div>
)
export default DrivingHistoryTopBar
