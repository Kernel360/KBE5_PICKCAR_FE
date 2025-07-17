import { useState } from 'react'
import axios from '../axiosConfig'
import { getErrorMessage } from './common/getErrorMessage'
import ReactDOM from 'react-dom'

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (name === 'phoneNumber') {
      // 숫자만 남기기
      let onlyNums = value.replace(/[^0-9]/g, '');
      // 하이픈 자동 추가
      if (onlyNums.length <= 3) {
        // 010
      } else if (onlyNums.length <= 7) {
        onlyNums = onlyNums.replace(/(\d{3})(\d+)/, '$1-$2');
      } else {
        onlyNums = onlyNums.replace(/(\d{3})(\d{4})(\d{0,4})/, '$1-$2-$3');
      }
      setFormData(prev => ({
        ...prev,
        phoneNumber: onlyNums,
      }));
    } else if (type === 'radio' && name === 'isAdmin') {
      setFormData(prev => ({
        ...prev,
        isAdmin: value === 'true',
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // 필수 필드 검증
    if (
      !formData.email ||
      !formData.password ||
      !formData.name ||
      !formData.phoneNumber
    ) {
      setError('모든 필수 항목을 입력해 주세요.')
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
          // 하이픈 제거 후 전송
          phoneNumber: formData.phoneNumber.replace(/-/g, ''),
          isAdmin: formData.isAdmin,
        },
        { skipAuth: true } as any
      )
      alert('회원가입이 완료되었습니다.')
      onClose()
    } catch (error: unknown) {
      const msg = getErrorMessage(error)
      if (msg) {
        setError(msg)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800 dark:shadow-gray-700">
        {/* 헤더 */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">회원가입</h2>
          <button
            className="text-2xl text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            onClick={onClose}
            aria-label="닫기"
          >
            &times;
          </button>
        </div>
        {/* 폼 */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                이메일
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="이메일을 입력해주세요"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base transition focus:border-blue-500 focus:bg-white focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:bg-gray-600"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                비밀번호
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="비밀번호를 입력해주세요(6자 이상 15자 이하)"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base transition focus:border-blue-500 focus:bg-white focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:bg-gray-600"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                이름
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="이름을 입력해주세요"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base transition focus:border-blue-500 focus:bg-white focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:bg-gray-600"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                전화번호
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="010-1234-1234"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base transition focus:border-blue-500 focus:bg-white focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:bg-gray-600"
              />
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
                    className="radio radio-primary"
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
                    className="radio radio-primary"
                  />
                  <span>사원</span>
                </label>
              </div>
            </div>

            {/* 하단 버튼 */}
            {error && (
                <div className="mt-2 flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-xs text-red-700 dark:border-red-600 dark:bg-red-900/30 dark:text-red-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.658-1.14 1.105-2.045l-6.928-12.01c-.526-.912-1.684-.912-2.21 0l-6.928 12.01c-.553.905.051 2.045 1.105 2.045z" />
                  </svg>
                  {error}
                </div>)}
            <div className="flex justify-end gap-2 pt-1">
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
      </div>,
    document.body
  )
}
