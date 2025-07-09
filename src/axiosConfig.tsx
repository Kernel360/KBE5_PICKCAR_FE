import axios, { AxiosRequestConfig } from 'axios'

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean
}

axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
    const customConfig = config as CustomAxiosRequestConfig
    if (!customConfig.skipAuth) {
      const token = localStorage.getItem('accessToken')
      console.log('인터셉터 실행됨')
      if (token) {
        customConfig.headers = customConfig.headers || {}
        customConfig.headers['Authorization'] = `Bearer ${token}`
      }
    }
    return customConfig
  },
  error => Promise.reject(error)
)

export default axios