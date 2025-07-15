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
        <div className="text-lg text-red-500 dark:text-red-400">{error}</div>
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
                이름
              </th>
<<<<<<< HEAD
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                직위
=======
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap dark:text-white">
                상태
              </th>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap dark:text-white">
                권한
>>>>>>> 8903c4d18065d192055839feab66b7bc4193bc2e
              </th>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap dark:text-white">
                이메일
              </th>
<<<<<<< HEAD
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                예약 여부
              </th>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                차량 번호
              </th>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">
=======
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap dark:text-white">
>>>>>>> 8903c4d18065d192055839feab66b7bc4193bc2e
                작업
              </th>
            </tr>
          </thead>
<<<<<<< HEAD
          <tbody className="divide-y divide-gray-100 border-b border-gray-200">
            {employees.map(employee => (
              <tr
                key={employee.employeeId}
                className="h-12 hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  {employee.employeeId}
=======
          <tbody className="divide-y divide-gray-100 border-b border-gray-200 dark:divide-gray-600 dark:border-gray-600">
            {employees.map((employee, idx) => (
              <tr
                key={employee.userId}
                className="h-12 hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300">
                  {idx + 1}
>>>>>>> 8903c4d18065d192055839feab66b7bc4193bc2e
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300">
                  {employee.name}
                </td>
<<<<<<< HEAD
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  {employee.role === 'EMPLOYEE' ? '사원' : '관리자'}
=======
                <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300">
                  {employee.status}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300">
                  {employee.role}
>>>>>>> 8903c4d18065d192055839feab66b7bc4193bc2e
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300">
                  {employee.email}
                </td>
<<<<<<< HEAD
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
                        color="#4c7b6d"
                        className="cursor-pointer rounded-xl p-2 hover:bg-gray-300"
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
                      color="#5e8db0"
                      size="xl"
                      className="cursor-pointer rounded-xl p-2 hover:bg-gray-300"
                      onClick={() => {
                        setSelectedEmployeeId(employee.employeeId)
                        setIsVehicleModalOpen(true)
                      }}
                    />
                  )}
=======
                <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300">
                  <FontAwesomeIcon
                    icon={faCarSide as IconProp}
                    className="btn p-3 dark:text-white"
                    onClick={() => {
                      setSelectedEmployeeId(employee.userId)
                      setIsVehicleModalOpen(true)
                    }}
                  />
>>>>>>> 8903c4d18065d192055839feab66b7bc4193bc2e
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
