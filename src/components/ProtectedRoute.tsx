import { ReactNode } from 'react'
import { useAuth } from './AuthContext'
import { Navigate } from 'react-router-dom'
import LoadingScreen from './common/LoadingScreen'

interface ProtectedRouteProps {
  allowedRoles: string[]
  children: ReactNode
}

export default function ProtectedRoute({ 
  allowedRoles, 
  children 
}: ProtectedRouteProps) {
  const { role, isLoading } = useAuth()

  // 초기화 중일 때는 로딩 화면 표시
  if (isLoading) {
    return <LoadingScreen />
  }

  if (!role) {
    // 로그인 안 했으면 로그인 페이지로
    alert(role + ' / 로그인 안 함')
    return <Navigate to="/" />
  }

  if (!allowedRoles.includes(role)) {
    // 권한 없으면 권한 없음 페이지로
    alert(role + ' / 권한이 없음')
    return <Navigate to="/unauthorized" />
  }
  alert(role + ' / 권한 있음')
  return children
} 