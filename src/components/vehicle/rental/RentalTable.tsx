import { useEffect, useState } from 'react'
import { VehicleListResponse, VehicleStatus } from '../../../types/vehicle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faWrench } from '@fortawesome/free-solid-svg-icons'

interface RentalTableProps {
  search: string
  filter: string
  onChangeStatus: (vehicle: VehicleListResponse) => void
  vehicles: VehicleListResponse[]
}

const statusStyles = {
  [VehicleStatus.OPERABLE]: 'bg-green-100 text-green-800',
  [VehicleStatus.UNDER_INSPECTION]: 'bg-yellow-100 text-yellow-800',
  [VehicleStatus.DAMAGED]: 'bg-red-100 text-red-800'
}

const statusLabels = {
  [VehicleStatus.OPERABLE]: '이용가능',
  [VehicleStatus.UNDER_INSPECTION]: '점검중',
  [VehicleStatus.DAMAGED]: '고장'
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
        <div className="text-lg text-gray-500">로딩 중...</div>
      </div>
    )
  }

  return (
    <div className="h-full min-h-0 flex-1 overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <div
        className="h-full overflow-y-auto"
        style={{ overflowX: 'auto', overflowY: 'auto' }}>
        <table className="table-zebra text-m table">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                No
              </th>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                차량번호
              </th>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                차종
              </th>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                상태
              </th>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                회사
              </th>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                대여일
              </th>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredVehicles.map((vehicle, idx) => (
              <tr
                key={vehicle.vehicleId}
                className="h-12 hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  {idx + 1}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  {vehicle.licensePlate}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  {vehicle.model}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  <span
                    className={`inline-flex w-20 justify-center rounded-full px-2.5 py-1 text-xs font-medium ${
                      statusStyles[vehicle.vehicleStatus]
                    }`}>
                    {statusLabels[vehicle.vehicleStatus]}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  {vehicle.rentedCompany || '-'}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  {vehicle.rentedAt
                    ? new Date(vehicle.rentedAt).toLocaleDateString()
                    : '-'}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  <FontAwesomeIcon
                    className="rounded p-2 hover:bg-gray-200"
                    icon={faWrench as IconProp}
                    size="lg"
                    color="black"
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
