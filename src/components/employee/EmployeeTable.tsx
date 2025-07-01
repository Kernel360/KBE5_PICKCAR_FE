import { useEffect, useState } from 'react'
import { Employee } from '@/types/employee'
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

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()!.split(';').shift() || null
  return null
}

axios.interceptors.request.use(
  config => {
    const token = getCookie('accessToken')
    if (token) {
      config.headers = config.headers || {}
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

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
      { id: 5, employeeId: 'emp005', name: '최동혁', position: '사원' },
      { id: 1, employeeId: 'emp001', name: '김철수', position: '사원' },
      { id: 2, employeeId: 'emp002', name: '이영희', position: '대리' },
      { id: 3, employeeId: 'emp003', name: '박민수', position: '과장' },
      { id: 4, employeeId: 'emp004', name: '정수진', position: '부장' },
      { id: 5, employeeId: 'emp005', name: '최동혁', position: '사원' },
      { id: 1, employeeId: 'emp001', name: '김철수', position: '사원' },
      { id: 2, employeeId: 'emp002', name: '이영희', position: '대리' },
      { id: 3, employeeId: 'emp003', name: '박민수', position: '과장' },
      { id: 4, employeeId: 'emp004', name: '정수진', position: '부장' },
      { id: 5, employeeId: 'emp005', name: '최동혁', position: '사원' }
    ]
  }
}

export default function EmployeeTable({ refreshKey }: EmployeeTableProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [employees, setEmployees] = useState<Employee[]>([])

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

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="table-zebra text-m table">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">
              No
            </th>
            <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">
              사원번호
            </th>
            <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">
              이름
            </th>
            <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">
              직책
            </th>
            <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">
              작업
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-b border-gray-200">
          {employees.map(employee => (
            <tr
              key={employee.id}
              className="h-12 hover:bg-gray-50">
              <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                {employee.id}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                {employee.employeeId}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                {employee.name}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                {employee.position}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                <div
                  color="#111111"
                  className="btn btn-primary rounded-2xl p-1 hover:bg-gray-200">
                  버튼
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
