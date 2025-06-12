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
