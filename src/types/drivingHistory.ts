import type { PaginationState } from '@/types/common/Pagination'

export interface DrivingHistoryEntry {
  historyId: number
  licensePlate: string
  driverName: string
  drivingStartedAt: string
  drivingEndedAt: string
  totalDrivingTime: string
  totalDistance: number
}

export interface DrivingHistoryDetail {
  historyId: number
  licensePlate: string
  model: string
  carAge: string
  reservationStatus: string
  drivingStartedAt: string
  drivingEndedAt: string
  totalDrivingTime: string
  totalDistance: number
  driverName: string
  path: CycleInfo[]
}

export interface CycleInfo {
  second: string
  gps_status: string
  latitude: number
  longitude: number
  angle: number
  speed: number
  battery: number
}

export interface DrivingHistoryFilter {
  from: string
  to: string
  driverName: string
}

export interface DrivingHistoryListResponse {
  content: DrivingHistoryEntry[]
  pagination: PaginationState
}
