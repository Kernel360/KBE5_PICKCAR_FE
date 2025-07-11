import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuth?: boolean;
  }
} 