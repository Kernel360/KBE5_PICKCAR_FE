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
                상태
              </th>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                권한
              </th>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                이메일
              </th>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-b border-gray-200">
            {employees.map((employee, idx) => (
              <tr
                key={employee.userId}
                className="h-12 hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  {idx + 1}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  {employee.name}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  {employee.status}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  {employee.role}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  {employee.email}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  <FontAwesomeIcon
                    icon={faCarSide as IconProp}
                    className="btn p-3"
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
