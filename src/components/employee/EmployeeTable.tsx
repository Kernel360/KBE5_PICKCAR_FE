import { useEffect, useState } from 'react'
import { Employee, AvailableVehicleResponse } from '@/types/employee'
import LoadingScreen from '@/components/common/LoadingScreen'
import axios from '../../axiosConfig'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faCarSide } from '@fortawesome/free-solid-svg-icons'
import ReservationVehicleListModal from '@/components/employee/ReservationModal'

interface EmployeeTableProps {
  refreshKey: number
}

export default function EmployeeTable({ refreshKey }: EmployeeTableProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [employees, setEmployees] = useState<Employee[]>([])
  const [vehicleList, setVehicleList] = useState<AvailableVehicleResponse[]>([])
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false)
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  )

  const fetchPreInfo = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get('/api/v1/reservation/pre-info')
      setEmployees(res.data.data.employeeResponses)
      setVehicleList(res.data.data.vehicleResponses)
      setError(null)
    } catch {
      setError('사전 정보를 불러오는데 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPreInfo()
  }, [refreshKey])

  if (isLoading) {
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
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap dark:text-white">
                상태
              </th>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap dark:text-white">
                권한
              </th>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap dark:text-white">
                이메일
              </th>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap dark:text-white">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-b border-gray-200 dark:divide-gray-600 dark:border-gray-600">
            {employees.map((employee, idx) => (
              <tr
                key={employee.userId}
                className="h-12 hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300">
                  {idx + 1}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300">
                  {employee.name}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300">
                  {employee.status}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300">
                  {employee.role}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300">
                  {employee.email}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-300">
                  <FontAwesomeIcon
                    icon={faCarSide as IconProp}
                    className="btn p-3 dark:text-white"
                    onClick={() => {
                      setSelectedEmployeeId(employee.userId)
                      setIsVehicleModalOpen(true)
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isVehicleModalOpen && selectedEmployeeId && (
        <ReservationVehicleListModal
          vehicles={vehicleList}
          employeeId={selectedEmployeeId}
          onClose={() => setIsVehicleModalOpen(false)}
          onAssigned={() => {
            fetchPreInfo()
            setIsVehicleModalOpen(false)
          }}
        />
      )}
    </div>
  )
}
