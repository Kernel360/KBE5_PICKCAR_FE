import type { DrivingHistoryFilter } from '@/types/drivingHistory'

interface TopBarProps {
  filter: DrivingHistoryFilter
  setFilter: (f: DrivingHistoryFilter) => void
  onSearch: () => void
}

const today = new Date().toISOString().slice(0, 10)
const minDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  .toISOString()
  .slice(0, 10)

const DrivingHistoryTopBar = ({ filter, setFilter, onSearch }: TopBarProps) => (
  <div className="mb-4 flex flex-row items-center justify-between">
    <div className="justify-start">
      <h1 className="text-2xl font-bold text-gray-800">운행일지</h1>
    </div>

    <div className="flex flex-1 items-center justify-end gap-3">
      <h3 className="text-sm text-gray-950">
        조회 가능 기간은 최대 30일 입니다
      </h3>
      <input
        type="date"
        value={filter.from.slice(0, 10)}
        max={today}
        min={minDate}
        onChange={e =>
          setFilter({ ...filter, from: e.target.value + 'T00:00:00' })
        }
        className="input w-40 rounded border px-3 py-3 text-sm"
      />
      <input
        type="date"
        value={filter.to.slice(0, 10)}
        max={today}
        min={minDate}
        onChange={e =>
          setFilter({ ...filter, to: e.target.value + 'T23:59:59' })
        }
        className="input w-40 rounded border px-3 py-3 text-sm"
      />
      <input
        type="text"
        placeholder="운전자명"
        maxLength={15}
        value={filter.driverName}
        onChange={e => setFilter({ ...filter, driverName: e.target.value })}
        className="input w-40 rounded border px-3 py-3 text-sm"
      />
      <input
        type="text"
        placeholder="예약 기반 조회"
        className="input w-40"
        disabled
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
