import { Link, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../AuthContext'
import React from 'react'
import axios from '../../axiosConfig'

// function Header({ userRole }: HeaderProps) {
function Header() {
  const navigate = useNavigate()
  const { role, userName, logout } = useAuth() // logout 함수 추가
  const displayName = userName || '사용자'
  const linkTo = role === 'EMPLOYEE' ? '/employee/home' : '/dashboard'

  // 로그아웃 함수
  const handleLogout = () => {
    logout() // AuthContext의 logout 함수를 이용해 모든 컴포넌트에서 로그아웃 상태임을 전달
    navigate('/', { replace: true })
  }

  // 변조된 토큰 저장
  function setTamperedToken() {
    const token = localStorage.getItem('accessToken')
    if (token) {
      const parts = token.split('.')
      if (parts.length === 3) {
        // payload를 임의로 바꿈 (예: "tamperedPayload"를 base64로 인코딩)
        parts[1] = btoa('tamperedPayload')
        localStorage.setItem('accessToken', parts.join('.'))
        alert('변조된 토큰이 저장되었습니다!')
      } else {
        alert('현재 accessToken이 JWT 형식이 아닙니다.')
      }
    } else {
      alert('accessToken이 없습니다. 먼저 로그인 해주세요.')
    }
  }

  // 잘못된 토큰 저장
  function setMalformedToken() {
    localStorage.setItem('accessToken', 'not-a-jwt')
    alert('잘못된 토큰이 저장되었습니다!')
  }

  // 만료된 토큰 요청
  async function requestExpiredToken() {
    try {
      const response = await axios.post(
        '/api/v1/token/refresh-expired',
        {},
        { 
          skipAuth: true, 
          withCredentials: true
        }
      )
      
      if (response.data.data.accessToken) {
        localStorage.setItem('accessToken', response.data.data.accessToken)
        alert('만료된 토큰이 저장되었습니다!')
      } else {
        alert('응답에 accessToken이 없습니다.')
      }
    } catch (error) {
      alert('만료된 토큰 요청 중 오류 발생')
      console.error('Error requesting expired token:', error)
    }
  }

  return (
    <header className="flex h-16 w-full items-center justify-between bg-white px-6 shadow">
      <div className="flex items-center">
        <Link
          to={linkTo}
          className="flex items-center hover:opacity-80">
          <Logo />
          <span className="ml-2 text-lg font-medium text-gray-700">
            PickCar
          </span>
        </Link>
        
        {/* 테스트 버튼들을 왼쪽으로 이동 */}
        <div className="ml-8 flex gap-2">
          <button 
            onClick={setTamperedToken}
            className="rounded bg-yellow-500 px-2 py-1 text-xs text-white hover:bg-yellow-600">
            변조 토큰
          </button>
          <button 
            onClick={setMalformedToken}
            className="rounded bg-orange-500 px-2 py-1 text-xs text-white hover:bg-orange-600">
            잘못된 토큰
          </button>
          <button 
            onClick={requestExpiredToken}
            className="rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600">
            만료된 토큰
          </button>
        </div>
      </div>

      <div className="flex items-center">
        {role !== 'EMPLOYEE' && (
          <div className="mx-10 flex flex-row">
            <div className="mx-2 mt-2 inline-grid *:[grid-area:1/1]">
              <div className="status status-success animate-ping"></div>
              <div className="status status-success"></div>
            </div>{' '}
            <p className="text-gray-500">관제 시스템 정상</p>
          </div>
        )}

        <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-xl font-bold text-white">
          <FontAwesomeIcon
            icon={faUser as IconProp}
            size="lg"
            className="rounded px-3 py-3 outline"
          />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-sm font-extrabold text-gray-500">
            {displayName}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="ml-4 flex items-center rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600">
          <FontAwesomeIcon
            icon={faSignOutAlt as IconProp}
            className="mr-2"
          />
          로그아웃
        </button>
      </div>
    </header>
  )
}

export default Header
