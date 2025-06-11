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

export interface UpdateVehicleStatusRequest {
  vehicleId: number
  vehicleStatus: VehicleStatus
}

export interface RegisterVehicleRequest {
  vehicleInfo: {
    model: string
    color: string
    licensePlate: string
    carAge: string
    brandName: string
    fuelType: string
  }
  hasGps: boolean
}

export const getVehicleList = async (): Promise<VehicleListResponse[]> => {
  const response = await fetch('http://localhost:8080/api/v1/vehicles')
  if (!response.ok) {
    throw new Error('차량 목록을 불러오는데 실패했습니다.')
  }
  const result: ApiResponse<VehicleListResponse[]> = await response.json()
  return result.data
}

export const updateVehicleStatus = async (
  request: UpdateVehicleStatusRequest
): Promise<void> => {
  const response = await fetch('http://localhost:8080/api/v1/vehicles', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(
      errorData.errorReason?.reason || '차량 상태 변경에 실패했습니다.'
    )
  }
}

export const registerVehicle = async (
  request: RegisterVehicleRequest
): Promise<void> => {
  const response = await fetch('http://localhost:8080/api/v1/vehicles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(
      errorData.errorReason?.reason || '차량 등록에 실패했습니다.'
    )
  }
}
