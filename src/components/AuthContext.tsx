import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo
} from 'react'
import { jwtDecode } from 'jwt-decode'

//AuthContext에서 제공할 상태와 함수들을 정의
interface AuthContextType {
  role: string | null
  userName: string | null
  setRole: (role: string | null) => void
  setUserName: (userName: string | null) => void
  logout: () => void
}

//JWT 토큰에서 추출할 데이터 구조 정의
interface JwtPayload {
  role?: string
  name?: string
  exp?: number
}

//AuthContext 생성
const AuthContext = createContext<AuthContextType>({
  role: null,
  userName: null,
  setRole: () => {},
  setUserName: () => {},
  logout: () => {}
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      try {
        const payload: JwtPayload = jwtDecode(accessToken)
        setRole(payload.role ?? null)
        setUserName(payload.name ?? null)
      } catch {
        setRole(null)
        setUserName(null)
        localStorage.removeItem('accessToken')
      }
    }
  }, [])

  const logout = () => {
    setRole(null)
    setUserName(null)
    localStorage.removeItem('accessToken')
    // 로그아웃 API 호출 및 rt 쿠키 만료 필요
  }

  const value = useMemo(
    () => ({
      role,
      setRole,
      userName,
      setUserName,
      logout
    }),
    [role, userName]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
} 