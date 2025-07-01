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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {/* 헤더 */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-gray-900">사원 추가</h2>
          <button
            className="text-2xl text-gray-400 hover:text-gray-600"
            onClick={onCancel}
            aria-label="닫기">
            &times;
          </button>
        </div>

        {/* 폼 */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              아이디
            </label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="아이디를 입력하세요"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base transition focus:border-blue-500 focus:bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base transition focus:border-blue-500 focus:bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              비밀번호 확인
            </label>
            <input
              type="password"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              placeholder="비밀번호를 다시 입력하세요"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base transition focus:border-blue-500 focus:bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              이름
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="이름을 입력하세요"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base transition focus:border-blue-500 focus:bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              직책
            </label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base transition focus:border-blue-500 focus:bg-white focus:outline-none">
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
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-500">
              {error}
            </div>
          )}
          {/* 하단 버튼 */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              className="btn btn-default btn-soft btn-md rounded-2xl"
              onClick={onCancel}
              disabled={isLoading}>
              취소
            </button>
            <button
              type="submit"
              className="btn btn-md rounded-2xl bg-blue-500 text-white"
              disabled={isLoading}>
              {isLoading ? '등록 중...' : '등록'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
