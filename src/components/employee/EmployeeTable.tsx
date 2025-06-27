import { useEffect, useState } from 'react'
import { Employee } from '@/types/employee'
import Pagination from '@/components/common/Pagination'
import LoadingScreen from '@/components/common/LoadingScreen'
import axios from 'axios'

interface EmployeeTableProps {
  onEditEmployee: (employee: Employee) => void
  onDeleteEmployee: (employee: Employee) => void
  refreshKey: number
}

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true

const getEmployeeList = async (): Promise<Employee[]> => {
  try {
    // Todo: 실제 API 로 변경
    const response = await axios.get('/api/v1/employees')
    return response.data.data
  } catch (error) {
    console.error('Error fetching employees:', error)
    // 임시 데이터 반환
    return [
      { id: 1, employeeId: 'emp001', name: '김철수', position: '사원' },
      { id: 2, employeeId: 'emp002', name: '이영희', position: '대리' },
      { id: 3, employeeId: 'emp003', name: '박민수', position: '과장' },
      { id: 4, employeeId: 'emp004', name: '정수진', position: '부장' },
      { id: 5, employeeId: 'emp005', name: '최동혁', position: '사원' }
    ]
  }
}

export default function EmployeeTable({
  onEditEmployee,
  onDeleteEmployee,
  refreshKey
}: EmployeeTableProps) {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsLoading(true)
        const data = await getEmployeeList()
        setEmployees(data)
        setError(null)
      } catch (err) {
        setError('사원 목록을 불러오는데 실패했습니다.')
        console.error('Error fetching employees:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEmployees()
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

  const totalPages = Math.ceil(employees.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentEmployees = employees.slice(startIndex, endIndex)

  return (
    <div className="flex min-h-[600px] flex-col justify-between rounded-lg border border-gray-200 bg-white">
      <div className="max-h-[600px] min-h-[480px] overflow-y-auto">
        <table className="h-full w-full table-fixed divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-4 py-3 text-center font-semibold whitespace-nowrap text-gray-700"
                style={{ width: '15%' }}>
                No
              </th>
              <th
                className="px-4 py-3 text-center font-semibold whitespace-nowrap text-gray-700"
                style={{ width: '25%' }}>
                사원번호
              </th>
              <th
                className="px-4 py-3 text-center font-semibold whitespace-nowrap text-gray-700"
                style={{ width: '20%' }}>
                이름
              </th>
              <th
                className="px-4 py-3 text-center font-semibold whitespace-nowrap text-gray-700"
                style={{ width: '20%' }}>
                직책
              </th>
              <th
                className="px-1 py-3 text-center font-semibold whitespace-nowrap text-gray-700"
                style={{ width: '20%' }}></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-b border-gray-200">
            {currentEmployees.map((employee, idx) => (
              <tr
                key={employee.id}
                className="h-12 hover:bg-gray-50">
                <td
                  className="h-12 px-4 py-3 text-center text-gray-500"
                  style={{ width: '20%' }}>
                  {startIndex + idx + 1}
                </td>
                <td
                  className="h-12 truncate px-4 py-3 text-center whitespace-nowrap text-gray-600"
                  style={{ width: '20%' }}>
                  {employee.employeeId}
                </td>
                <td
                  className="h-12 truncate px-4 py-3 text-center whitespace-nowrap text-gray-600"
                  style={{ width: '20%' }}>
                  {employee.name}
                </td>
                <td
                  className="h-12 px-4 py-3 text-center whitespace-nowrap text-gray-600"
                  style={{ width: '20%' }}>
                  {employee.position}
                </td>
                <td
                  className="h-12 px-1 py-3 text-center whitespace-nowrap"
                  style={{ width: '20%' }}>
                  <div className="flex justify-center gap-1">
                    <button
                      className="rounded bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-700"
                      onClick={() => onEditEmployee(employee)}>
                      정보수정
                    </button>
                    <button
                      className="rounded bg-red-600 px-2 py-1 text-xs text-white hover:bg-red-700"
                      onClick={() => onDeleteEmployee(employee)}>
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="my-2 flex h-12 w-full items-center justify-between gap-4 border-t border-gray-100 bg-white px-4">
        <div className="text-sm text-gray-500">
          총 {employees.length}개 중 {startIndex + 1}-
          {Math.min(endIndex, employees.length)} 개 표시
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
