import { useEffect, useState } from 'react'
import { VehicleListResponse, VehicleStatus } from '../../../types/vehicle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  faWrench,
  faHammer,
  faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'

interface RentalTableProps {
  search: string
  filter: string
  onChangeStatus: (vehicle: VehicleListResponse) => void
  vehicles: VehicleListResponse[]
}

const statusStyles = {
  [VehicleStatus.OPERABLE]: 'badge badge-success',
  [VehicleStatus.UNDER_INSPECTION]: 'badge badge-warning',
  [VehicleStatus.DAMAGED]: 'badge badge-error'
}

const statusLabels = {
  [VehicleStatus.OPERABLE]: '정상',
  [VehicleStatus.UNDER_INSPECTION]: '점검중',
  [VehicleStatus.DAMAGED]: '고장'
}

const statusIcon = {
  [VehicleStatus.OPERABLE]: faCircleCheck,
  [VehicleStatus.UNDER_INSPECTION]: faHammer,
  [VehicleStatus.DAMAGED]: faTriangleExclamation
}

export default function RentalTable({
  search,
  filter,
  onChangeStatus,
  vehicles
}: RentalTableProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [vehicles])

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.licensePlate
      .toLowerCase()
      .includes(search.toLowerCase())
    const matchesFilter = !filter || vehicle.vehicleStatus === filter
    return matchesSearch && matchesFilter
  })

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-lg text-gray-500 dark:text-gray-400">
          로딩 중...
        </div>
      </div>
    )
  }

  return (
    <div className="h-full min-h-0 flex-1 overflow-x-auto rounded-lg border border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800">
      <div
        className="h-full overflow-y-auto"
        style={{ overflowX: 'auto', overflowY: 'auto' }}>
        <table className="table-zebra text-m table">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap dark:text-white">
                No
              </th>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap dark:text-white">
                차량번호
              </th>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap dark:text-white">
                차종
              </th>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap dark:text-white">
                색상
              </th>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap dark:text-white">
                등록일
              </th>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap dark:text-white">
                상태
              </th>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap dark:text-white">
                대여 여부
              </th>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap dark:text-white">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-600">
            {filteredVehicles.map((vehicle, idx) => (
              <tr
                key={vehicle.vehicleId}
                className="h-12 hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300">
                  {idx + 1}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300">
                  {vehicle.licensePlate}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300">
                  {vehicle.model}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300">
                  {vehicle.color}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300">
                  {vehicle.createdAt
                    ? new Date(vehicle.createdAt).toLocaleDateString()
                    : '-'}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300">
                  <span
                    className={`inline-flex w-20 justify-center rounded-full px-2.5 py-1 text-xs font-medium ${
                      statusStyles[vehicle.vehicleStatus]
                    }`}>
                    <FontAwesomeIcon
                      icon={statusIcon[vehicle.vehicleStatus] as IconProp}
                    />
                    {statusLabels[vehicle.vehicleStatus]}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300">
                  {vehicle.isRented ? '대여중' : '-'}
                </td>

                <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300">
                  <FontAwesomeIcon
                    className="cursor-pointer rounded p-3 hover:bg-gray-200 dark:hover:bg-gray-600"
                    icon={faWrench as IconProp}
                    size="lg"
                    onClick={() => onChangeStatus(vehicle)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
