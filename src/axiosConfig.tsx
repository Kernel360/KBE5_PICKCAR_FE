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
      // @ts-expect-error: skipAuth는 커스텀 임시 속성
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

export default defaultAxios