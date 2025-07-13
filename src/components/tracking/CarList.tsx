import React from 'react'
import CarListItem from './CarListItem'
import type { Car } from '@/types/tracking'

/**
 * 차량 전체 목록
 * CarList 컴포넌트로 차량 전체 목록을 화면에 보여줌
 */

interface CarListProps {
  cars: Car[]
  selectedVehicleId: number | null
  onSelectCar: (vehicleId: number) => void
}
function CarList({
  cars,
  selectedVehicleId,
  onSelectCar
}: CarListProps): React.ReactElement {
  return (
    <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
      {' '}
      {/* todo : 스크롤 추가 */}
      {cars.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">표시할 차량이 없습니다.</p>
      ) : (
        cars.map(car => (
          <CarListItem
            key={car.vehicleId} // 차량 번호가 고유하다고 가정
            car={car}
            isSelected={selectedVehicleId === car.vehicleId}
            onSelectCar={onSelectCar}
          />
        ))
      )}
    </div>
  )
}

export default CarList
