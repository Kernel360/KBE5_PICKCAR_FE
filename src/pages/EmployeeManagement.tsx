import Header from '@/components/common/Header'
import SideMenuBar from '@/components/common/SideMenuBar'
import EmployeeTable from '@/components/employee/EmployeeTable'
import EmployeeManagementTopBar from '@/components/employee/EmployeeManagementTopBar'
import { useEffect, useState } from 'react'
import axios from '@/axiosConfig'
import {
  EmployeeReservationProjection,
  AvailableVehicleResponse
} from '@/types/employee'

export default function EmployeeManagement() {
  const [refreshKey, setRefreshKey] = useState(0)
  const [employees, setEmployees] = useState<EmployeeReservationProjection[]>(
    []
  )
  const [vehicleList, setVehicleList] = useState<AvailableVehicleResponse[]>([])
  const [filter, setFilter] = useState<'all' | 'reserved' | 'not_reserved'>(
    'all'
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const empRes = await axios.get('/api/v1/reservation/pre-info')
        setEmployees(
          Array.isArray(empRes.data.data?.employeePreInfos)
            ? empRes.data.data.employeePreInfos
            : []
        )
        const vehRes = await axios.get('/api/v1/vehicles/available')
        setVehicleList(vehRes.data.data)
        setError(null)
      } catch {
        setError('데이터를 불러오는데 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [refreshKey])

  // 필터링
  const filteredEmployees = employees.filter(emp => {
    if (filter === 'all') return true
    if (filter === 'reserved') return emp.hasReservation
    if (filter === 'not_reserved') return !emp.hasReservation
    return true
  })

  return (
    <div className="flex flex-col bg-[#f5f8fa] dark:bg-gray-900">
      <header className="flex bg-white dark:bg-gray-800">
        <Header />
      </header>
      <div className="flex flex-1">
        <SideMenuBar />
        <main className="relative mx-2 flex h-[calc(100vh-64px)] min-h-0 flex-1 flex-col p-6">
          <EmployeeManagementTopBar
            filter={filter}
            onFilterChange={setFilter}
          />
          <div className="min-h-[400px] flex-1 flex-col rounded-2xl bg-white p-0 shadow dark:bg-gray-800 dark:shadow-gray-700">
            <EmployeeTable
              employees={filteredEmployees}
              vehicleList={vehicleList}
              refreshKey={refreshKey}
              onRefresh={() => setRefreshKey(k => k + 1)}
              loading={loading}
              error={error}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
