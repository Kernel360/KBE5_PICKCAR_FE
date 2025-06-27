import { VehicleStatus } from '@/types/vehicle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'

interface RentalTopBarProps {
  search: string
  setSearch: (value: string) => void
  filter: string
  setFilter: (value: string) => void
  onClickAddCar?: () => void
}

export default function RentalTopBar({
  search,
  setSearch,
  filter,
  setFilter,
  onClickAddCar
}: RentalTopBarProps) {
  return (
    <div className="my-5 flex flex-row items-center justify-between">
      <div className="justify-start">
        <h1 className="text-xl font-bold">차량 등록/관리</h1>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onClickAddCar}>
          <FontAwesomeIcon
            icon={faSquarePlus as IconProp}
            size="2xl"
          />
        </button>

        <div className="relative">
          <label
            htmlFor="vehicle-search"
            className="sr-only">
            차량번호 검색
          </label>
          <input
            id="vehicle-search"
            className="input ml-8 rounded border border-gray-300 bg-white px-3 py-2 text-sm"
            placeholder="차량번호 검색"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="relative mx-5">
          <div className="flex gap-3 filter">
            <input
              className={`btn filter-reset ${filter === '' ? 'btn-active' : ''}`}
              type="radio"
              name="statusFilter"
              aria-label="전체"
              checked={filter === ''}
              onChange={() => setFilter('')}
            />
            <input
              className={`btn btn-soft btn-success btn-sm mt-1 outline ${filter === VehicleStatus.OPERABLE ? 'btn-active' : ''}`}
              type="radio"
              name="statusFilter"
              aria-label="이용가능"
              checked={filter === VehicleStatus.OPERABLE}
              onChange={() => setFilter(VehicleStatus.OPERABLE)}
            />
            <input
              className={`btn btn-soft btn-secondary btn-sm mt-1 outline ${filter === VehicleStatus.UNDER_INSPECTION ? 'btn-active' : ''}`}
              type="radio"
              name="statusFilter"
              aria-label="점검중"
              checked={filter === VehicleStatus.UNDER_INSPECTION}
              onChange={() => setFilter(VehicleStatus.UNDER_INSPECTION)}
            />
            <input
              className={`btn btn-error btn-soft btn-sm mt-1 outline ${filter === VehicleStatus.DAMAGED ? 'btn-active' : ''}`}
              type="radio"
              name="statusFilter"
              aria-label="고장"
              checked={filter === VehicleStatus.DAMAGED}
              onChange={() => setFilter(VehicleStatus.DAMAGED)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
