export interface Employee {
  userId: number
  name: string
  status: string // UserStatus
  role: string // UserRole
  email: string
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

export interface EmployeeListResponse {
  content: Employee[]
  page: {
    number: number
    size: number
    totalPages: number
    totalElements: number
  }
}
