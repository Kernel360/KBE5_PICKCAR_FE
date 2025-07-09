//앱 전체에서 role을 공유할 수 있도록
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { jwtDecode } from 'jwt-decode'

//타입 정의 인터페이스스
interface AuthContextType {
  role: string | null
  setRole: (role: string | null) => void
}

//React Context 생성 
//React 앱에서 전역 상태나 데이터를 편리하게 공유할 수 있도록 도와주는 기능
const AuthContext = createContext<AuthContextType>({
  role: null,
  setRole: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<string | null>(null)

// 앱 시작/새로고침 시 localStorage에서 accessToken을 읽어 role 세팅
// 새로고침해도 로그인 역할 상태를 유지
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      const payload: any = jwtDecode(accessToken)
      setRole(payload.role)
    }
  }, [])

  //앱 전체 어디서든 useAuth() 훅으로 접근 가능
  return (
    <AuthContext.Provider value={{ role, setRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
} 