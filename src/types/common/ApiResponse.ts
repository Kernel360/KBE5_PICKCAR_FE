export interface ApiResponse<T> {
  responseInfo: {
    isSuccess: boolean
    statusCode: number
    timeStamp: string
  }
  data: T
}
