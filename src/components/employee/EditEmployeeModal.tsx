import { useState } from 'react'
import { Employee, EmployeePosition } from '@/types/employee'
import axios from 'axios'

interface EditEmployeeModalProps {
  employee: Employee
  onSuccess: () => void
  onCancel: () => void
}

interface EditFormData {
  name: string
  position: string
}

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true

export default function EditEmployeeModal({
  employee,
  onSuccess,
  onCancel
}: EditEmployeeModalProps) {
  const [formData, setFormData] = useState<EditFormData>({
    name: employee.name,
    position: employee.position
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('이름을 입력해주세요.')
      return false
    }
    if (!formData.position) {
      setError('직책을 선택해주세요.')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // TODO: 실제 API 엔드포인트로 변경 필요
      await axios.put(`/api/v1/employees/${employee.id}`, {
        name: formData.name,
        position: formData.position
      })
      onSuccess()
    } catch (error) {
      console.error('Error updating employee:', error)
      if (axios.isAxiosError(error) && error.response?.data) {
        setError(
          error.response.data.message || '사원 정보 수정에 실패했습니다.'
        )
      } else {
        setError('사원 정보 수정에 실패했습니다.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-bold text-gray-800">사원 정보 수정</h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              사원번호
            </label>
            <input
              type="text"
              value={employee.employeeId}
              disabled
              className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              이름
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              placeholder="이름을 입력하세요"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              직책
            </label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none">
              <option value={EmployeePosition.EMPLOYEE}>
                {EmployeePosition.EMPLOYEE}
              </option>
              <option value={EmployeePosition.ASSISTANT_MANAGER}>
                {EmployeePosition.ASSISTANT_MANAGER}
              </option>
              <option value={EmployeePosition.MANAGER}>
                {EmployeePosition.MANAGER}
              </option>
              <option value={EmployeePosition.GENERAL_MANAGER}>
                {EmployeePosition.GENERAL_MANAGER}
              </option>
            </select>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              취소
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
              {isLoading ? '수정 중...' : '수정'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
