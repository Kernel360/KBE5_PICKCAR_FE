import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPerson,
  faCarSide,
  faWrench,
  faRotateLeft
} from '@fortawesome/free-solid-svg-icons'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { VehicleReservationStat as VehicleReservationStatType } from '@/types/dailyReport'

interface VehicleReservationStatProps {
  currentData: VehicleReservationStatType
  yesterdayData: VehicleReservationStatType
}

const VehicleReservationStat: React.FC<VehicleReservationStatProps> = ({
  currentData,
  yesterdayData
}) => {
  // 증감률 계산 함수
  const calculatePercentageChange = (
    current: number,
    previous: number
  ): string => {
    if (previous === 0) return current > 0 ? '100% 증가' : '0%'
    const change = ((current - previous) / previous) * 100
    const sign = change >= 0 ? '+' : ''
    return `${sign}${change.toFixed(1)}% ${change >= 0 ? '증가' : '감소'}`
  }

  // 전일 대비 설명 텍스트 생성 함수
  const getComparisonText = (current: number, previous: number): string => {
    const percentageChange = calculatePercentageChange(current, previous)
    return `전일(${previous}대) 대비 ${percentageChange}`
  }
  return (
    <div className="flex w-full flex-none flex-row items-center justify-between">
      <div className="stats flex flex-1 flex-row overflow-x-auto bg-white py-4 shadow">
        <div className="stat">
          <div className="stat-figure text-primary">
            <FontAwesomeIcon
              icon={faCarSide}
              size="xl"
              color="#374151"
            />
          </div>
          <div className="stat-title text-sm font-bold">총 등록 차량</div>
          <div className="stat-value text-blue-500">
            {currentData.totalVehicleCount}대
          </div>
          <div className="stat-desc">
            {getComparisonText(
              currentData.totalVehicleCount,
              yesterdayData.totalVehicleCount
            )}
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-blue-500">
            <FontAwesomeIcon
              icon={faCalendarCheck}
              size="xl"
              color="#374151"
            />
          </div>
          <div className="stat-title text-sm font-bold">예약된 차량</div>
          <div className="stat-value text-success">
            {currentData.reservedVehicleCount}대
          </div>
          <div className="stat-desc">
            {getComparisonText(
              currentData.reservedVehicleCount,
              yesterdayData.reservedVehicleCount
            )}
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-warning">
            <FontAwesomeIcon
              icon={faWrench}
              size="xl"
              color="#374151"
            />
          </div>
          <div className="stat-title text-sm font-bold">점검중인 차량</div>
          <div className="stat-value text-warning">
            {currentData.notOperableVehicleCount}대
          </div>
          <div className="stat-desc">
            {getComparisonText(
              currentData.notOperableVehicleCount,
              yesterdayData.notOperableVehicleCount
            )}
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure">
            <FontAwesomeIcon
              icon={faRotateLeft}
              size="xl"
              color="#374151"
            />
          </div>
          <div className="stat-title text-sm font-bold">반납 예정</div>
          <div className="stat-value">{currentData.expectedReturnCount}대</div>
          <div className="stat-desc text-secondary">
            {currentData.delayedCount}대 반납 지연중
          </div>
        </div>
      </div>
    </div>
  )
}

export default VehicleReservationStat
