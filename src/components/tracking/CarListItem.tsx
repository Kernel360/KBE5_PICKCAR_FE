import React from 'react' // JSX 사용 및 React 타입 참조를 위해 import
import type { Car } from '@/types/tracking'

/**
 * 개별 차량 정보
 * 차량 목록에 표시될 단 하나의 차량 정보를 보여줌
 */

interface CarListItemProps {
  car: Car
  isSelected: boolean
  onViewDetails: (carNumber: string) => void // void 반환
}

function CarListItem({
  car,
  isSelected,
  onViewDetails
}: CarListItemProps): React.ReactElement {
  const baseClasses =
    'flex cursor-pointer items-center justify-between rounded p-3'
  const selectedClasses = 'bg-blue-50'
  const hoverClasses = 'hover:bg-blue-50'

  const buttonBaseClasses = 'rounded px-3 py-1 text-sm'
  const buttonSelectedClasses = 'bg-blue-500 text-white'
  const buttonNormalClasses = 'bg-blue-100 text-blue-500 hover:bg-blue-200'

  return (
    <div
      className={`${baseClasses} ${isSelected ? selectedClasses : hoverClasses}`}
      onClick={() => onViewDetails(car.number)} // 항목 클릭 시에도 상세보기 호출 가능
    >
      <div>
        <div className="font-semibold">{car.number}</div>
        <div className="text-xs text-gray-400">
          {car.model} · {car.location}
        </div>
      </div>
      <button
        onClick={e => {
          e.stopPropagation() // div의 onClick 이벤트 전파 방지
          onViewDetails(car.number)
        }}
        className={`${buttonBaseClasses} ${isSelected ? buttonSelectedClasses : buttonNormalClasses}`}>
        상세보기
      </button>
    </div>
  )
}

export default CarListItem
