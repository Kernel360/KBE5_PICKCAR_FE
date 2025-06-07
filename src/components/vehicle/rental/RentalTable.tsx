import React, { useState } from 'react'
import Pagination from '../../common/Pagination'

interface VehicleRental {
  number: string
  info: string
  status: string
  company: string
  date: string
  action: string
}

interface VehicleRentalTableProps {
  vehicles: VehicleRental[]
  onAction: (number: string, action: string) => void
  onChangeStatus: (number: string) => void
}

function VehicleRentalTable({
  vehicles,
  onAction,
  onChangeStatus
}: VehicleRentalTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  if (!vehicles || vehicles.length === 0) {
    return (
      <p className="py-4 text-center text-gray-500">표시할 차량이 없습니다.</p>
    )
  }

  const statusColor: Record<string, string> = {
    대여중: 'bg-yellow-100 text-yellow-700',
    이용가능: 'bg-green-100 text-green-700'
  }

  const actionColor: Record<string, string> = {
    회수: 'bg-red-100 text-red-500',
    대여: 'bg-blue-100 text-blue-500'
  }

  const totalPages = Math.ceil(vehicles.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentVehicles = vehicles.slice(startIndex, endIndex)

  return (
    <div className="flex min-h-[600px] flex-col justify-between rounded-lg border border-gray-200 bg-white">
      <div className="max-h-[600px] min-h-[480px] overflow-y-auto">
        <table className="h-full w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 px-4 py-3 text-left font-semibold whitespace-nowrap text-gray-700">
                No
              </th>
              <th className="w-32 px-4 py-3 text-left font-semibold whitespace-nowrap text-gray-700">
                차량번호
              </th>
              <th className="w-40 px-4 py-3 text-left font-semibold whitespace-nowrap text-gray-700">
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
                key={vehicle.number}
                className="h-12 hover:bg-gray-50">
                <td className="h-12 w-12 px-4 py-3 text-center text-gray-500">
                  {startIndex + idx + 1}
                </td>
                <td className="h-12 w-32 truncate px-4 py-3 whitespace-nowrap text-gray-600">
                  {vehicle.number}
                </td>
                <td className="h-12 w-40 truncate px-4 py-3 whitespace-nowrap text-gray-600">
                  {vehicle.info}
                </td>
                <td className="h-12 w-24 px-4 py-3 whitespace-nowrap">
                  <span
                    className={`inline-flex w-20 justify-center rounded-full px-2.5 py-1 text-xs font-medium ${statusColor[vehicle.status] || ''}`}>
                    {vehicle.status}
                  </span>
                </td>
                <td className="h-12 w-32 truncate px-4 py-3 whitespace-nowrap text-gray-600">
                  {vehicle.company}
                </td>
                <td className="h-12 w-32 truncate px-4 py-3 whitespace-nowrap text-gray-600">
                  {vehicle.date}
                </td>
                <td className="flex h-12 w-24 gap-2 px-4 py-2 whitespace-nowrap text-gray-600">
                  <button
                    onClick={() => onAction(vehicle.number, vehicle.action)}
                    className={`rounded px-3 py-1.5 text-xs font-medium focus:ring-2 focus:ring-offset-2 focus:outline-none ${actionColor[vehicle.action] || 'bg-gray-100 text-gray-500'}`}>
                    {vehicle.action}
                  </button>

                  <button
                    onClick={() => onChangeStatus(vehicle.number)}
                    className={`text-black-500 rounded bg-orange-100 px-3 py-1.5 text-xs font-medium focus:ring-2 focus:ring-offset-2 focus:outline-none`}>
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
          총 {vehicles.length}개 중 {startIndex + 1}-
          {Math.min(endIndex, vehicles.length)} 개 표시
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

export default VehicleRentalTable
