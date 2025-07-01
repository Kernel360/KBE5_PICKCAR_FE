import { useState } from 'react'
import Header from '@/components/common/Header'
import SideMenuBar from '@/components/common/SideMenuBar'
import EmployeeTable from '@/components/employee/EmployeeTable'
import AddEmployeeModal from '@/components/employee/AddEmployeeModal'
import EditEmployeeModal from '@/components/employee/EditEmployeeModal'
import { Employee } from '@/types/employee'
import axios from 'axios'
import EmployeeManagementTopBar from '@/components/employee/EmployeeManagementTopBar'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true

export default function EmployeeManagement() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  )
  const [refreshKey, setRefreshKey] = useState(0)

  const handleAddEmployee = () => {
    setIsAddModalOpen(true)
  }

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee)
    setIsEditModalOpen(true)
  }

  const handleDeleteEmployee = async (employee: Employee) => {
    if (window.confirm(`'${employee.name}' 사원을 삭제하시겠습니까?`)) {
      try {
        // TODO: 실제 API 엔드포인트로 변경 필요
        // await axios.delete(`/api/v1/employees/${employee.id}`)
        console.log('사원 삭제:', employee)
        alert('사원이 삭제되었습니다.')
        setRefreshKey(prev => prev + 1)
      } catch (error) {
        console.error('Error deleting employee:', error)
        alert('사원 삭제에 실패했습니다.')
      }
    }
  }

  const handleAddSuccess = () => {
    setIsAddModalOpen(false)
    setRefreshKey(prev => prev + 1)
  }

  const handleEditSuccess = () => {
    setIsEditModalOpen(false)
    setSelectedEmployee(null)
    setRefreshKey(prev => prev + 1)
  }

  const handleAddCancel = () => {
    setIsAddModalOpen(false)
  }

  const handleEditCancel = () => {
    setIsEditModalOpen(false)
    setSelectedEmployee(null)
  }

  return (
    <div className="flex flex-col bg-[#f5f8fa]">
      <header className="flex bg-white">
        <Header />
      </header>

      <div className="flex flex-1">
        <SideMenuBar />

        <main className="relative mx-2 flex h-[calc(100vh-64px)] min-h-0 flex-1 flex-col p-6">
          <EmployeeManagementTopBar onAddEmployee={handleAddEmployee} />

          <div
            className={`min-h-[400px] flex-1 flex-col rounded-2xl bg-white p-0 shadow`}>
            <EmployeeTable
              onEditEmployee={handleEditEmployee}
              onDeleteEmployee={handleDeleteEmployee}
              refreshKey={refreshKey}
            />
          </div>
        </main>
      </div>

      {/* 사원 추가 모달 */}
      {isAddModalOpen && (
        <AddEmployeeModal
          onSuccess={handleAddSuccess}
          onCancel={handleAddCancel}
        />
      )}

      {/* 사원 정보 수정 모달 */}
      {isEditModalOpen && selectedEmployee && (
        <EditEmployeeModal
          employee={selectedEmployee}
          onSuccess={handleEditSuccess}
          onCancel={handleEditCancel}
        />
      )}
    </div>
  )
}
