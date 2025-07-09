import { ReactNode } from 'react'
import { useAuth } from './AuthContext'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  allowedRoles: string[]
  children: ReactNode
}

export default function ProtectedRoute({ 
  allowedRoles, 
  children 
}: ProtectedRouteProps) {
  const { role } = useAuth()

  if (!role) {
    // 로그인 안 했으면 로그인 페이지로
    return <Navigate to="/login" />
  }

  if (!allowedRoles.includes(role)) {
    // 권한 없으면 권한 없음 페이지로
    return <Navigate to="/unauthorized" />
  }

  return children
} 