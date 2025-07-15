import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../axiosConfig'
import SignUpModal from './SignUpModal'
import { getErrorMessage } from './common/getErrorMessage'
import { useAuth } from './AuthContext'
import { jwtDecode } from 'jwt-decode'

interface JwtPayload {
  role?: string
  name?: string
}

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showSignUpModal, setShowSignUpModal] = useState(false)
  const navigate = useNavigate()
  const { setRole, setUserName, role, isLoading } = useAuth()

  // 로그인 상태에서 접근 시 자동 리다이렉트
  useEffect(() => {
    if (!isLoading && role) {
      if (role === 'EMPLOYEE') {
        navigate('/emulator', { replace: true })
      } else {
        navigate('/dashboard', { replace: true })
      }
    }
  }, [role, isLoading, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.')
      return
    }
    try {
      const response = await axios.post(
        '/api/v1/auth/login',
        {
          email,
          password
        },
        { skipAuth: true } as any)
      const result = response.data

      // 로그인 성공 시 로직
      const accessToken = result?.data?.accessToken
      if (!accessToken) {
        setError('AccessToken이 응답에 없습니다. 관리자에게 문의해 주세요.')
        return
      }

      // localStorage에 저장
      localStorage.setItem('accessToken', accessToken)
      //토큰 파싱
      const payload: JwtPayload = jwtDecode(accessToken)
      setRole(payload.role || null) // 전역 상태에 role 저장
      setUserName(payload.name || null) // 전역 상태에 name 저장

      // 권한 확인
      if (payload?.role === 'EMPLOYEE') {
        navigate('/emulator', { replace: true })
      } else {
        navigate('/dashboard', { replace: true })
      }
    } catch (err) {
      const msg = getErrorMessage(err)
      if (msg) {
        setError(msg)
      }
    }
  }

  if (isLoading) return null
  if (role) return null // 리다이렉트 중엔 폼 숨김

  return (
    <div className="flex w-full flex-col items-center">
      <form
        className="flex w-full max-w-xs flex-col p-4"
        onSubmit={handleSubmit}>
        <label className="mt-3 mb-1 text-sm text-white">이메일</label>
        <input
          type="email"
          placeholder="이메일 주소를 입력하세요."
          className="mb-2 bg-transparent border-b border-gray-400 focus:border-green-400 text-sm text-white placeholder-gray-300 px-0 py-3 outline-none transition"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label className="mt-3 mb-1 text-sm text-white">비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호를 입력하세요."
          className="mb-12 bg-transparent border-b border-gray-400 focus:border-green-400 text-sm text-white placeholder-gray-300 px-0 py-3 outline-none transition"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && (
          <div className="mt-1 mb-2 text-[11px] font-normal text-red-500">
            {error}
          </div>
        )}
        <button
          type="submit"
          className="btn w-full rounded-full bg-blue-500 py-5 text-lg font-semibold text-white">
          로그인
        </button>
        <div className="mt-4 text-center text-sm text-gray-500">
          계정이 없으신가요?{' '}
          <button
            type="button"
            className="font-semibold text-blue-500 hover:underline"
            onClick={() => setShowSignUpModal(true)}>
            회원가입
          </button>
        </div>
      </form>
      {showSignUpModal && (
        <SignUpModal onClose={() => setShowSignUpModal(false)} />
      )}
    </div>
  )
}

export default LoginForm
