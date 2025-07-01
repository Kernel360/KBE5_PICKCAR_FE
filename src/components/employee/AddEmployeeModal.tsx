import { useState } from 'react'
import { EmployeeFormData, EmployeePosition } from '@/types/employee'
import axios from 'axios'

interface AddEmployeeModalProps {
  onSuccess: () => void
  onCancel: () => void
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

export default function AddEmployeeModal({
  onSuccess,
  onCancel
}: AddEmployeeModalProps) {
  const [formData, setFormData] = useState<EmployeeFormData>({
    employeeId: '',
    password: '',
    passwordConfirm: '',
    name: '',
    position: EmployeePosition.EMPLOYEE
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
    if (!formData.employeeId.trim()) {
      setError('아이디를 입력해주세요.')
      return false
    }
    if (!formData.password) {
      setError('비밀번호를 입력해주세요.')
      return false
    }
    if (formData.password !== formData.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.')
      return false
    }
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
      await axios.post('/api/v1/employees', {
        employeeId: formData.employeeId,
        password: formData.password,
        name: formData.name,
        position: formData.position
      })
      onSuccess()
    } catch (error) {
      console.error('Error adding employee:', error)
      if (axios.isAxiosError(error) && error.response?.data) {
        setError(error.response.data.message || '사원 등록에 실패했습니다.')
      } else {
        setError('사원 등록에 실패했습니다.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-bold text-gray-800">사원 추가</h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              아이디
            </label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              placeholder="아이디를 입력하세요"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              비밀번호 확인
            </label>
            <input
              type="password"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              placeholder="비밀번호를 다시 입력하세요"
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
              {isLoading ? '등록 중...' : '등록'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
