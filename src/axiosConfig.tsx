import axios, { InternalAxiosRequestConfig } from 'axios'
import type { AxiosInstance } from 'axios'

// 공통 설정으로 axios 인스턴스 생성 함수
const createAxiosInstance = (baseURL: string) => {
  return axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
  })
}

// 각 서버별 인스턴스 생성
const defaultAxios = createAxiosInstance(import.meta.env.VITE_API_BASE_URL)
export const trackingAxios = createAxiosInstance(
  import.meta.env.VITE_TRACKING_API_URL
)
export const employeeAxios = createAxiosInstance(
  import.meta.env.VITE_EMULATOR_API_URL
)

// 인터셉터(토큰 자동 추가) - 모든 인스턴스에 적용
const addAuthInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (!config.skipAuth) {
        const token = localStorage.getItem('accessToken')
        if (token) {
          config.headers = config.headers || {}
          config.headers['Authorization'] = `Bearer ${token}`
        }
      }
      return config
    },
    error => Promise.reject(error)
  )
}

// 모든 인스턴스에 인터셉터 일괄 적용
const instances = [defaultAxios, trackingAxios, employeeAxios]
instances.forEach(addAuthInterceptor)

// ====== 에러코드별 분기 처리 response 인터셉터 추가 ======
function handleLogoutAndRedirect() {
  localStorage.removeItem('accessToken')
  window.location.href = '/'
}

const errorHandlers: Record<string, (msg?: string) => void | Promise<void>> = {
  EXPIRED: async () => {
    try {
      alert('재발급 요청')
      const res = await defaultAxios.post(
        '/api/v1/token/refresh',
        {},
        { skipAuth: true, withCredentials: true }
      )
      const accessToken = res.data.data?.accessToken
      if (!accessToken) throw new Error('accessToken이 응답에 없습니다.')
      localStorage.setItem('accessToken', accessToken)
      console.log('재발급 성공!')
    } catch {
      localStorage.removeItem('accessToken')
      console.log('재발급 실패패!')
      window.location.href = '/'
    }
  },
  INVALID_SIGNATURE: handleLogoutAndRedirect,
  INVALID: handleLogoutAndRedirect,
  MALFORMED: handleLogoutAndRedirect,
  MISSING: handleLogoutAndRedirect,
  TOKEN_400_1: handleLogoutAndRedirect
}

const handleAuthError = (error: any) => {
  const errorCode = error.response?.data?.errorReason?.errorCode
  const errorMessage = error.response?.data?.errorReason?.reason
  console.log('errorCode : ' + errorCode)

  if (errorHandlers[errorCode]) {
    errorHandlers[errorCode](errorMessage)
  }
  //.TODO: 공통된 에러 처리 하고 싶으면 아래 else{} 수정
  // else {
  //   handleLogoutAndRedirect()
  // }
  return Promise.reject(error)
}

// 모든 인스턴스에 response 인터셉터 추가
instances.forEach(instance => {
  instance.interceptors.response.use(response => response, handleAuthError)
})

export default defaultAxios
