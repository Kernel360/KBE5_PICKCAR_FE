import React, { useEffect, useState } from 'react'
import {
  VehicleListResponse,
  VehicleStatus,
  getVehicleList
} from '../../../types/vehicle'
import Pagination from '../../common/Pagination'

interface RentalTableProps {
  search: string
  filter: string
  onReturn: (vehicle: VehicleListResponse) => void
  onChangeStatus: (vehicle: VehicleListResponse) => void
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
  onReturn,
  onChangeStatus
}: RentalTableProps) {
  const [vehicles, setVehicles] = useState<VehicleListResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setIsLoading(true)
        const data = await getVehicleList()
        setVehicles(data)
        setError(null)
      } catch (err) {
        setError('차량 목록을 불러오는데 실패했습니다.')
        console.error('Error fetching vehicles:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVehicles()
  }, [])

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

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    )
  }

  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentVehicles = filteredVehicles.slice(startIndex, endIndex)

  return (
    <div className="flex min-h-[600px] flex-col justify-between rounded-lg border border-gray-200 bg-white">
      <div className="max-h-[600px] min-h-[480px] overflow-y-auto">
        <table className="h-full w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 px-4 py-3 text-left font-semibold whitespace-nowrap text-gray-700">
                No
              </th>
              <th className="w-20 px-4 py-3 text-left font-semibold whitespace-nowrap text-gray-700">
                차량번호
              </th>
              <th className="w-32 px-4 py-3 text-left font-semibold whitespace-nowrap text-gray-700">
                차종
              </th>
              <th className="w-24 px-4 py-3 text-left font-semibold whitespace-nowrap text-gray-700">
                상태
              </th>
              <th className="w-32 px-4 py-3 text-left font-semibold whitespace-nowrap text-gray-700">
                회사
              </th>
              <th className="w-32 px-4 py-3 text-left font-semibold whitespace-nowrap text-gray-700">
                대여일
              </th>
              <th className="w-24 px-4 py-3 text-left font-semibold whitespace-nowrap text-gray-700">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-b border-gray-200">
            {currentVehicles.map((vehicle, idx) => (
              <tr
                key={vehicle.vehicleId}
                className="h-12 hover:bg-gray-50">
                <td className="h-12 w-12 px-4 py-3 text-center text-gray-500">
                  {startIndex + idx + 1}
                </td>
                <td className="h-12 w-20 truncate px-4 py-3 whitespace-nowrap text-gray-600">
                  {vehicle.licensePlate}
                </td>
                <td className="h-12 w-32 truncate px-4 py-3 whitespace-nowrap text-gray-600">
                  {vehicle.model}
                </td>
                <td className="h-12 w-24 px-4 py-3 whitespace-nowrap">
                  <span
                    className={`inline-flex w-20 justify-center rounded-full px-2.5 py-1 text-xs font-medium ${
                      statusStyles[vehicle.vehicleStatus]
                    }`}>
                    {statusLabels[vehicle.vehicleStatus]}
                  </span>
                </td>
                <td className="h-12 w-32 truncate px-4 py-3 whitespace-nowrap text-gray-600">
                  {vehicle.rentedCompany || '-'}
                </td>
                <td className="h-12 w-32 truncate px-4 py-3 whitespace-nowrap text-gray-600">
                  {vehicle.rentedAt
                    ? new Date(vehicle.rentedAt).toLocaleDateString()
                    : '-'}
                </td>
                <td className="flex h-12 w-24 gap-2 px-4 py-2 whitespace-nowrap text-gray-600">
                  {vehicle.rentedCompany && (
                    <button
                      className="rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
                      onClick={() => onReturn(vehicle)}>
                      회수
                    </button>
                  )}
                  <button
                    className="rounded bg-orange-100 px-3 py-1 text-xs text-orange-700 hover:bg-orange-200"
                    onClick={() => onChangeStatus(vehicle)}>
                    상태 변경
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="my-2 flex h-12 w-full items-center justify-between gap-4 border-t border-gray-100 bg-white px-4">
        <div className="text-sm text-gray-500">
          총 {filteredVehicles.length}개 중 {startIndex + 1}-
          {Math.min(endIndex, filteredVehicles.length)} 개 표시
        </div>
        <Pagination
          current={currentPage}
          total={totalPages}
          onChange={page => setCurrentPage(page)}
        />
      </div>
    </div>
  )
}
