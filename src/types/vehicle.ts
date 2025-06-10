export enum VehicleStatus {
  OPERABLE = 'OPERABLE',
  UNDER_INSPECTION = 'UNDER_INSPECTION',
  DAMAGED = 'DAMAGED'
}

export interface VehicleListResponse {
  vehicleId: number
  licensePlate: string
  model: string
  color: string
  vehicleStatus: VehicleStatus
  rentedCompany: string | null
  rentedAt: string | null
}

export interface ApiResponse<T> {
  responseInfo: {
    isSuccess: boolean
    statusCode: number
    timeStamp: string
  }
  data: T
}

export const getVehicleList = async (): Promise<VehicleListResponse[]> => {
  const response = await fetch('http://localhost:8080/api/v1/vehicles')
  if (!response.ok) {
    throw new Error('차량 목록을 불러오는데 실패했습니다.')
  }
  const result: ApiResponse<VehicleListResponse[]> = await response.json()
  return result.data
}
