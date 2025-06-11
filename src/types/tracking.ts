export interface Company {
  id: string
  name: string
}

export interface Car {
  vehicleId: number
  licensePlate: string
  model: string
  companyId: string
  location: string
  lat: number
  lng: number
  gpxId?: string
}
