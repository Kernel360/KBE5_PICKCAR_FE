export interface EmployeeReservationProjection {
  reservationId: number
  employeeId: number
  name: string
  email: string
  role: string // UserRole
  hasReservation: boolean
  licensePlate: string | null
}

export interface EmployeeFormData {
  employeeId: string
  password: string
  passwordConfirm: string
  name: string
  position: string
}

export enum EmployeePosition {
  EMPLOYEE = '사원',
  ASSISTANT_MANAGER = '대리',
  MANAGER = '과장',
  GENERAL_MANAGER = '부장'
}

export interface AvailableVehicleResponse {
  vehicleId: number
  model: string
  licensePlate: string
  color: string
  carAge: string
}

export interface EmployeeListResponse {
  content: EmployeeReservationProjection[]
  page: {
    number: number
    size: number
    totalPages: number
    totalElements: number
  }
}
