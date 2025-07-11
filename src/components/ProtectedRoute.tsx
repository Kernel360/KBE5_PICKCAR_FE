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

  // 권한별 홈 경로 매핑
  const roleHomeMap: Record<string, string> = {
    EMPLOYEE: '/employee/home',
    SUPER_ADMIN: '/dashboard',
    // 필요시 다른 권한 추가
  }

  // 초기화 중일 때는 로딩 화면 표시
  if (isLoading) {
    return <LoadingScreen />
  }

  if (!role) {
    // 로그인 안 했으면 로그인 페이지로
    console.log(role + ' / 로그인 안 함')
    return (
      <Navigate
        to="/"
        replace
      />
    )
  }

  if (!allowedRoles.includes(role)) {
    // 권한 없으면 권한별 홈이 있으면 그리로, 없으면 /unauthorized로
    console.log(role + '  / 권한이 없음')
    const redirectTo = roleHomeMap[role] || '/unauthorized'
    return (
      <Navigate
        to={redirectTo}
        replace
      />
    )
  }
  console.log(role + '  / 권한이 있음')
  return children
} 