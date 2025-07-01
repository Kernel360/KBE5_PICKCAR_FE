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
  path: GpsData[]
}

export interface GpsData {
  latitude: number
  longitude: number
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
