export interface VehicleReservationStat {
  totalVehicleCount: number
  reservedVehicleCount: number
  notOperableVehicleCount: number
  expectedReturnCount: number
  delayedCount: number
}

export interface DriverAndDistanceContext {
  driverName: string
  totalDistance: number
}

export interface DestinationCountStat {
  rank: number
  destination: string
  visitCount: number
}

export interface MovedDistanceHistoryProjection {
  reportDate: string
  totalMovedDistance: number
}

export interface DynamicInfo {
  totalMovedDistance: number
  top3DriversContext: DriverAndDistanceContext[]
  destinationStats: DestinationCountStat[]
}

export interface DailyReportPreInfoResponse {
  currentStat: VehicleReservationStat
  yesterdayStat: VehicleReservationStat
  yesterdayDynamicInfo: DynamicInfo
  movedDistances: MovedDistanceHistoryProjection[]
  yesterday: string
}
