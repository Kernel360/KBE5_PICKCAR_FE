import React from 'react'
import { DriverAndDistanceContext } from '@/types/dailyReport'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPerson } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface TotalDistanceRankingProps {
  drivers: DriverAndDistanceContext[]
}

const TotalDistanceRanking: React.FC<TotalDistanceRankingProps> = ({
  drivers
}) => {
  return (
    <ul className="list bg-base-100 rounded-box flex pr-40 shadow-md">
      <li className="p-4 pb-2 text-sm font-bold tracking-wide opacity-60">
        어제 가장 많이 이동한 사원
      </li>
      {drivers.map((driver, idx) => (
        <li
          className="list-row"
          key={driver.driverName}>
          <div className="text-xl tabular-nums opacity-30">
            {String(idx + 1).padStart(2, '0')}
          </div>
          <FontAwesomeIcon
            icon={faPerson as IconProp}
            className="rounded-box mt-1.5 ml-2 size-10"
            size="xl"
          />
          <div className="list-col-grow">
            <div>{driver.driverName}</div>
            <div className="text-xs font-semibold uppercase opacity-60">
              {driver.totalDistance.toLocaleString()} km
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default TotalDistanceRanking
