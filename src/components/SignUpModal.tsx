import { useState } from 'react'
import axios from '../axiosConfig'
import { getErrorMessage } from './common/getErrorMessage'

interface SignUpModalProps {
  onClose: () => void
}

export default function SignUpModal({ onClose }: SignUpModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
    isAdmin: false
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [emailError, setEmailError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    if (type === 'radio' && name === 'isAdmin') {
      setFormData(prev => ({
        ...prev,
        isAdmin: value === 'true'
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    console.log(error)

    // 필수 필드 검증
    if (
      !formData.email ||
      !formData.password ||
      !formData.name ||
      !formData.phoneNumber
    ) {
      setError('모든 필드를 입력해주세요.')
      return
    }

    setIsLoading(true)
    try {
      await axios.post(
        '/api/v1/auth/sign-up',
        {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          isAdmin: formData.isAdmin
        },
        { skipAuth: true } as any
      )
      alert('회원가입이 완료되었습니다.')
      onClose()
    } catch (error: unknown) {
      const msg = getErrorMessage(error)

      // 서버에서 응답한 에러 메세지가 없다면 alert / 있다면 email input 밑밑에 메세지 출력
      if (msg) {
        setEmailError(msg)
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
          <h2 className="text-2xl font-extrabold text-gray-900">회원가입</h2>
          <button
            className="text-2xl text-gray-400 hover:text-gray-600"
            onClick={onClose}
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
              이메일 *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="이메일을 입력하세요"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base transition focus:border-blue-500 focus:bg-white focus:outline-none"
            /> 
            {emailError && (
              <div className="mt-1 text-sm text-red-500">{emailError}</div>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              비밀번호 *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="비밀번호를 입력하세요 (6자 이상)"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base transition focus:border-blue-500 focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              이름 *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="이름을 입력하세요"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base transition focus:border-blue-500 focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              전화번호 *
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="전화번호를 입력하세요"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base transition focus:border-blue-500 focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              권한 선택
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="isAdmin"
                  value="true"
                  checked={formData.isAdmin === true}
                  onChange={handleInputChange}
                  className="radio radio-primary"
                />
                <span>관리자</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="isAdmin"
                  value="false"
                  checked={formData.isAdmin === false}
                  onChange={handleInputChange}
                  className="radio radio-primary"
                />
                <span>사원</span>
              </label>
            </div>
          </div>

          {/* 하단 버튼 */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              className="btn btn-default btn-soft btn-md rounded-2xl"
              onClick={onClose}
              disabled={isLoading}>
              취소
            </button>
            <button
              type="submit"
              className="btn btn-md rounded-2xl bg-blue-500 text-white"
              disabled={isLoading}>
              {isLoading ? '처리중...' : '가입하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
