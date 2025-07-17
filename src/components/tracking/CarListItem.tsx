import React from 'react' // JSX 사용 및 React 타입 참조를 위해 import
import type { Car } from '@/types/tracking'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

/**
 * 개별 차량 정보
 * 차량 목록에 표시될 단 하나의 차량 정보를 보여줌
 */

interface CarListItemProps {
  car: Car
  isSelected: boolean
  onSelectCar: (carNumber: number) => void
}

function CarListItem({
  car,
  isSelected,
  onSelectCar
}: CarListItemProps): React.ReactElement {
  const baseClasses =
    'flex cursor-pointer items-center justify-between rounded p-3'
  const selectedClasses = 'bg-blue-50 dark:bg-blue-900'
  const hoverClasses = 'hover:bg-blue-50 dark:hover:bg-blue-900'

  return (
    <div
      className={`${baseClasses} ${isSelected ? selectedClasses : hoverClasses}`}
      onClick={() => {
        console.log(
          `[CarListItem] div 클릭! 전달할 차량 번호: ${car.vehicleId}`
        )

        onSelectCar(car.vehicleId)
      }}>
      <div>
        <div className="font-semibold dark:text-white">{car.licensePlate}</div>
        <div className="text-xs text-gray-400 dark:text-gray-500">
          {car.model} · {car.location}
        </div>
      </div>
      <div>
        <button
          onClick={e => {
            e.stopPropagation() // div의 onClick 이벤트 전파 방지
            console.log(
              `[CarListItem] 버튼 클릭! 전달할 차량 번호: ${car.vehicleId}`
            )
            onSelectCar(car.vehicleId)
          }}
          className="hover-gray-500">
          <FontAwesomeIcon
            icon={faLocationDot as IconProp}
            size="lg"
            color="#5e8db0"
            className="cursor-pointer rounded-xl px-3 py-3 hover:bg-gray-300"
          />
        </button>
      </div>
    </div>
  )
}

export default CarListItem
