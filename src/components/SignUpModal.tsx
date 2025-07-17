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
    isAdmin: true // 기본값을 true(관리자)로 설정
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')

  // 전화번호 포맷팅 함수
  const formatPhoneNumber = (value: string) => {
    // 숫자만 추출
    const numbers = value.replace(/[^\d]/g, '')

    // 11자리 이하로 제한
    if (numbers.length > 11) return value

    // 전화번호 형식에 맞게 포맷팅
    if (numbers.length <= 3) {
      return numbers
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`
    }
  }

  // 전화번호 유효성 검사
  const validatePhoneNumber = (phone: string) => {
    const numbers = phone.replace(/[^\d]/g, '')
    if (numbers.length !== 11) {
      return '전화번호는 11자리여야 합니다.'
    }
    if (
      !numbers.startsWith('010') &&
      !numbers.startsWith('011') &&
      !numbers.startsWith('016') &&
      !numbers.startsWith('017') &&
      !numbers.startsWith('018') &&
      !numbers.startsWith('019')
    ) {
      return '올바른 휴대폰 번호를 입력해주세요.'
    }
    return ''
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target

    if (type === 'radio' && name === 'isAdmin') {
      setFormData(prev => ({
        ...prev,
        isAdmin: value === 'true'
      }))
    } else if (name === 'phoneNumber') {
      // 전화번호 입력 처리
      const formattedValue = formatPhoneNumber(value)
      setFormData(prev => ({
        ...prev,
        phoneNumber: formattedValue
      }))

      // 실시간 유효성 검사
      const validationError = validatePhoneNumber(formattedValue)
      setPhoneError(validationError)
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

    // 전화번호 최종 유효성 검사
    const phoneValidationError = validatePhoneNumber(formData.phoneNumber)
    if (phoneValidationError) {
      setPhoneError(phoneValidationError)
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
        { skipAuth: true } as { skipAuth: boolean }
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
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800 dark:shadow-gray-700">
        {/* 헤더 */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            회원가입
          </h2>
          <button
            className="text-2xl text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
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
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              이메일 *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="이메일을 입력하세요"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base transition focus:border-blue-500 focus:bg-white focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:bg-gray-600"
            />
            {emailError && (
              <div className="mt-1 text-sm text-red-500 dark:text-red-400">
                {emailError}
              </div>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              비밀번호 *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="비밀번호를 입력하세요 (6자 이상)"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base transition focus:border-blue-500 focus:bg-white focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:bg-gray-600"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              이름 *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="이름을 입력하세요"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base transition focus:border-blue-500 focus:bg-white focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:bg-gray-600"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              전화번호 *
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="010-0000-0000"
              maxLength={13}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base transition focus:border-blue-500 focus:bg-white focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:bg-gray-600"
            />
            {phoneError && (
              <div className="mt-1 text-sm text-red-500 dark:text-red-400">
                {phoneError}
              </div>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              권한 선택
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 dark:text-gray-300">
                <input
                  type="radio"
                  name="isAdmin"
                  value="true"
                  checked={formData.isAdmin === true}
                  onChange={handleInputChange}
                  className="radio radio-primary outline-none"
                />
                <span>관리자</span>
              </label>
              <label className="flex items-center gap-2 dark:text-gray-300">
                <input
                  type="radio"
                  name="isAdmin"
                  value="false"
                  checked={formData.isAdmin === false}
                  onChange={handleInputChange}
                  className="radio radio-primary outline-none"
                />
                <span>사원</span>
              </label>
            </div>
          </div>

          {/* 하단 버튼 */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              className="btn btn-default btn-soft btn-md rounded-2xl dark:bg-gray-600 dark:text-gray-200"
              onClick={onClose}
              disabled={isLoading}>
              취소
            </button>
            <button
              type="submit"
              className="btn btn-md rounded-2xl bg-blue-500 text-white dark:bg-blue-600"
              disabled={isLoading}>
              {isLoading ? '처리중...' : '가입하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
