import { useState } from 'react'
import {
  EmployeeReservationProjection,
  AvailableVehicleResponse
} from '@/types/employee'
import LoadingScreen from '@/components/common/LoadingScreen'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faCarSide, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import ReservationVehicleListModal from '@/components/employee/ReservationModal'
import ReservationDetailModal from '@/components/employee/ReservationDetailModal'

interface EmployeeTableProps {
  employees: EmployeeReservationProjection[]
  vehicleList: AvailableVehicleResponse[]
  refreshKey: number
  onRefresh: () => void
  loading: boolean
  error: string | null
}

export default function EmployeeTable({
  employees,
  vehicleList,
  refreshKey,
  onRefresh,
  loading,
  error
}: EmployeeTableProps) {
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false)
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  )
  const [detailModalId, setDetailModalId] = useState<number | null>(null)

  if (loading) {
    return <LoadingScreen />
  }

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-lg text-red-500">{error}</div>
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
                이름
              </th>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                직위
              </th>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                이메일
              </th>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                예약 여부
              </th>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                차량 번호
              </th>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-b border-gray-200">
            {employees.map(employee => (
              <tr
                key={employee.employeeId}
                className="h-12 hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  {employee.employeeId}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  {employee.name}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  {employee.role === 'EMPLOYEE' ? '사원' : '관리자'}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  {employee.email}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  {employee.hasReservation ? (
                    <span className="font-bold text-green-600">예약됨</span>
                  ) : (
                    <span className="text-gray-400">미예약</span>
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  {employee.hasReservation ? employee.licensePlate || '-' : '-'}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  {employee.hasReservation ? (
                    <>
                      <FontAwesomeIcon
                        icon={faInfoCircle as IconProp}
                        size="xl"
                        className="btn btn-info rounded-3xl p-2"
                        onClick={() => setDetailModalId(employee.reservationId)}
                      />
                      {detailModalId === employee.reservationId && (
                        <ReservationDetailModal
                          reservationId={employee.reservationId}
                          onClose={() => setDetailModalId(null)}
                        />
                      )}
                    </>
                  ) : (
                    <FontAwesomeIcon
                      icon={faCarSide as IconProp}
                      size="xl"
                      className="btn btn-success rounded-3xl p-2"
                      onClick={() => {
                        setSelectedEmployeeId(employee.employeeId)
                        setIsVehicleModalOpen(true)
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isVehicleModalOpen && selectedEmployeeId !== null && (
        <ReservationVehicleListModal
          vehicles={vehicleList}
          employeeId={selectedEmployeeId}
          onClose={() => setIsVehicleModalOpen(false)}
          onAssigned={() => {
            onRefresh()
            setIsVehicleModalOpen(false)
          }}
        />
      )}
    </div>
  )
}
