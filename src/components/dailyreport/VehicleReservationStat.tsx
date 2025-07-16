import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCarSide,
  faWrench,
  faRotateLeft,
  faWarehouse
} from '@fortawesome/free-solid-svg-icons'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { VehicleReservationStat as VehicleReservationStatType } from '@/types/dailyReport'
import axios from '@/axiosConfig'

interface VehicleReservationStatProps {
  currentData: VehicleReservationStatType
  yesterdayData: VehicleReservationStatType
  onRefreshCurrentStat?: (newStat: VehicleReservationStatType) => void
}

const VehicleReservationStat: React.FC<VehicleReservationStatProps> = ({
  currentData,
  yesterdayData,
  onRefreshCurrentStat
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

  const [loading, setLoading] = useState(false)

  const handleRefresh = async () => {
    if (!onRefreshCurrentStat) return
    setLoading(true)
    try {
      const res = await axios.get('/api/v1/report/stat')
      onRefreshCurrentStat(res.data)
    } catch {
      // 에러 핸들링 필요시 추가
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex w-full flex-none flex-row items-center justify-between">
      <div className="stats flex flex-1 flex-row overflow-x-auto bg-white px-5 py-4 shadow dark:bg-gray-800 dark:shadow-gray-700">
        <div className="stat">
          <div className="stat-figure text-primary">
            <FontAwesomeIcon
              icon={faCarSide}
              size="xl"
              color="#2b7fff"
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
              color="#00d390"
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
              color="#fcb700"
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
              icon={faWarehouse}
              size="xl"
            />
          </div>
          <div className="stat-title text-sm font-bold">
            반납 예정(3일 이내)
          </div>
          <div className="stat-value">{currentData.expectedReturnCount}대</div>
          <div className="stat-desc text-secondary font-bold">
            {currentData.delayedCount}대 반납 지연중
          </div>
        </div>
        <button
          className="ml-4 flex items-center justify-center"
          onClick={handleRefresh}
          disabled={loading}
          title="새로고침"
          type="button">
          <FontAwesomeIcon
            icon={faRotateLeft}
            size="xl"
            color="#374151"
            className="btn rounded-xl py-3"
          />
        </button>
      </div>
    </div>
  )
}

export default VehicleReservationStat
