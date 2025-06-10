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
}
