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

export default function EmployeeTable({ refreshKey }: EmployeeTableProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [employees, setEmployees] = useState<Employee[]>([])

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get('/api/v1/auth/employees')
        console.log(response)
        setEmployees(response.data.data)
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
              이름
            </th>
            <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">
              상태
            </th>
            <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">
              권한
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
                <div className="btn btn-primary rounded-2xl p-1 hover:bg-gray-200">
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
